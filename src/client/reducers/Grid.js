import {
	initGrid,
	createFreshGrid,
	createNewPieces,
	getUpdatedGrid,
	pieceCanMove,
	pieceOverflows,
	blockPieceInGrid,
	attemptWallKicks,
	applyRotationTopiece,
	removeFullLines,
	updateGridWithScore,
	generateBlockedLines,
	addBlockedLines,
	getUpdatedGridWithShadow,
} from '../helpers/Grid';

const initState = () => ({
	grid: initGrid(),
	pieces: null,
	interval: null,
	overflows: false,
	piecesQueue: [],
	score: {
		lines: 0,
		total: 0,
		garbage: 0,
	}
});

const actions = {
	'reset-grid' : () => {
		return initState();
	},
	'set-score': (state, { propName, prop }) => {
		return {
			...state,
			score: {
				...state.score,
				[propName] : prop,
			}
		};
	},
	'place-garbage': (state, { garbage }) => {
		const { grid, score } = state;
		const blocked = generateBlockedLines(garbage);
		const updated = addBlockedLines(grid, blocked, garbage);

		return {
			...state,
			grid: updated,
			score: {
				...score,
				garbage: 0,
			}
		};
	},
	'start-animation' : (state, { interval }) => {
		return {
			...state,
			interval,
		};
	},
	'queue-pieces': (state, { pieces }) => {
		return {
			...state,
			piecesQueue: [
				...state.piecesQueue,
				pieces,
			],
		};
	},
	'pop-pieces': state => {
		return {
			...state,
			pieces: state.piecesQueue[0],
			piecesQueue: state.piecesQueue.slice(1),
		};
	},
	'place-piece' : (state) => {
		const { grid, pieces } = state;
		const freshGrid = createFreshGrid(grid);
		const piecesToPlace = createNewPieces(pieces);
		const { origin, current } = piecesToPlace;
		const gridBuffer = getUpdatedGrid(freshGrid, origin, current);

		return {
			...state,
			pieces: piecesToPlace,
			grid: gridBuffer,
		};
	},
	'translate-piece' : (state, { translation }) => {
		const { pieces, grid, score } = state;
		const { origin, current } = pieces;

		if (!current) return state;

		const freshGrid = createFreshGrid(grid);

		const updatedOrigin = {
			x: origin.x + translation.x,
			y: origin.y + translation.y,
		};
		const canMove = pieceCanMove(freshGrid, updatedOrigin, current);

		// can not move down anymore
		if (!canMove && translation.y > 0) {
			if (pieceOverflows(grid)) return { ...state, overflows: true };

			const blocked = blockPieceInGrid(grid);
			const filtered = removeFullLines(blocked);
			const scored = updateGridWithScore(filtered);
			const lines = grid.length - filtered.length;

			return {
				...state,
				grid: scored,
				pieces: null,
				score: {
					...score,
					lines,
					total: score.total + lines * lines * 10,
				},
			};
		}

		if (!canMove) return state;

		const gridBuffer = getUpdatedGrid(freshGrid, updatedOrigin, current);
		const gridWithShadow = getUpdatedGridWithShadow(gridBuffer, updatedOrigin, current);

		return {
			...state,
			grid: gridWithShadow,
			pieces: { ...pieces, origin: updatedOrigin },
		};
	},
	'rotate-piece' : (state) => {
		const { pieces, grid } = state;

		if (!pieces) return state;

		const { origin, current } = pieces;
		const freshGrid = createFreshGrid(grid);

		if (!pieces) return state;

		const rotated = applyRotationTopiece(current);

		if (!pieceCanMove(freshGrid, origin, rotated)){
			return {
				...state,
				...attemptWallKicks(pieces, freshGrid),
			};
		}

		return {
			...state,
			grid: getUpdatedGrid(freshGrid, origin, rotated),
			pieces: { ...pieces, current: rotated},
		};
	},
};

const gridReducer = (state = initState(), action) => {
	if (state.overflows && action.type !== 'reset-grid') {
		return state;
	}

	return actions[action.type] ? actions[action.type](state, action) : state;
};

export default gridReducer;
