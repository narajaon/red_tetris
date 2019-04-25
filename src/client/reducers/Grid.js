import { cloneDeep } from 'lodash';
import {
	initGrid,
	createFreshGrid,
	createNewPieces,
	getUpdatedGrid,
	pieceCanMove,
	pieceOverflows,
	blockPieceInGrid,
	removeScoredLines,
	clone2DGrid,
	attemptWallKicks,
	applyRotationTopiece
} from '../helpers/Grid';

const initState = {
	grid: initGrid(),
	pieces: null,
	interval: null,
	overflows: false,
};

const actions = {
	'start-animation' : (state, { interval }) => {
		return {
			...state,
			interval
		};
	},
	'reset-grid' : (state) => {
		return {
			...state,
			grid: initGrid(),
			pieces: null,
			interval: null,
			overflows: false,
		};
	},
	'place-piece' : (state, { pieces }) => {
		const { grid } = state;
		const freshGrid = createFreshGrid(grid);
		const piecesToPlace = createNewPieces(pieces);
		const { origin, current } = piecesToPlace;
		const gridBuffer = getUpdatedGrid(freshGrid, origin, current);

		return {
			...state,
			pieces: cloneDeep(piecesToPlace),
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
		const newPieces = { ...cloneDeep(pieces), origin: {...updatedOrigin}};

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
			pieces: { ...cloneDeep(pieces), current: rotated},
		};
	},
};

const gridReducer = (state = initState, action) => {
	if (state.overflows && action.type !== 'reset-grid') {
		// console.log('OVER', state);
		return state;
	}

	return actions[action.type] ? actions[action.type](state, action) : state;
};

export default gridReducer;