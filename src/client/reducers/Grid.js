import {
	initGrid,
	createFreshGrid,
	createNewPieces,
	getUpdatedGrid,
	pieceCanMove,
	pieceOverflows,
	blockPieceInGrid,
	removeScoredLines,
	attemptWallKicks,
	applyRotationTopiece
} from '../helpers/Grid';

const initState = {
	grid: initGrid(),
	pieces: null,
	interval: null,
	overflows: false,
	piecesQueue: [],
};

const actions = {
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
	'reset-grid' : state => {
		return {
			...state,
			grid: initGrid(),
			pieces: null,
			interval: null,
			overflows: false,
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
		const { pieces, grid } = state;
		const { origin, current } = pieces;
		const freshGrid = createFreshGrid(grid);
		if (!current) return state;
		const updatedOrigin = {
			x: origin.x + translation.x,
			y: origin.y + translation.y,
		};
		const canMove = pieceCanMove(freshGrid, updatedOrigin, current);

		// can not move down anymore
		if (!canMove && translation.y > 0) {
			if (pieceOverflows(grid)) return { ...state, overflows: true };
			const blocked = blockPieceInGrid(grid);
			const scored = removeScoredLines(blocked);

			return {
				...state,
				grid: scored,
				pieces: null,
			};
		}

		if (!canMove) return state;
		const gridBuffer = getUpdatedGrid(freshGrid, updatedOrigin, current);
		const newPieces = { ...pieces, origin: { ...updatedOrigin }};

		return {
			...state,
			grid: gridBuffer,
			pieces: newPieces,
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
				...attemptWallKicks(pieces, current, freshGrid),
			};
		}

		return {
			...state,
			grid: getUpdatedGrid(freshGrid, origin, rotated),
			pieces: { ...pieces, current: rotated},
		};
	},
};

const gridReducer = (state = initState, action) => {
	if (state.overflows && action.type !== 'reset-grid') {
		console.log('OVER');

		return state;
	}

	return actions[action.type] ? actions[action.type](state, action) : state;
};

export default gridReducer;