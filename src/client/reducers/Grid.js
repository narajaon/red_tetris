import { cloneDeep } from 'lodash';
import actionCreator from '../actions';

const initState = {
	grid: initGrid(),
	pieces: {
		current: createNewPiece(actionCreator.tetris),
		origin: { x: 3, y: 0 },
		name: '',
		kick: 0,
	},
};

const actions = {
	'place-piece' : (state) => {
		const { grid, pieces } = state;
		const { origin, current } = pieces;
		const gridBuffer = getUpdatedGrid(initGrid(), origin, current);

		return {
			...state,
			pieces,
			grid: gridBuffer,
		};
	},
	'translate-piece' : (state, { translation }) => {
		const { pieces, grid } = state;
		const { origin, current } = pieces;
		if (!current) return state;
		const updatedOrigin = {
			x: origin.x + translation.x,
			y: origin.y + translation.y,
		};
		// still using initGrid for now, will replace to grid
		const canMove = pieceCollides(initGrid(), updatedOrigin, current);
		if (!canMove) return state;
		const gridBuffer = getUpdatedGrid(initGrid(), updatedOrigin, current);
		const newPieces = { ...cloneDeep(pieces), origin: {...updatedOrigin}};

		return {
			...state,
			grid: gridBuffer,
			pieces: newPieces,
		};
	},
	'rotate-piece' : (state) => {
		const { pieces, grid } = state;
		const { origin, current } = pieces;
		if (!pieces) return state;
		const pieceCopy = clone2DGrid(current);
		const n = pieceCopy.length;
		const rotated = pieceCopy.map((line, y) => {
			return line.map((col, x) => {
				return pieceCopy[n - x - 1][y];
			});
		});
		const newPieces = { ...cloneDeep(pieces), current: rotated};
		const gridBuffer = getUpdatedGrid(initGrid(), origin, rotated);
		
		return {
			...state,
			grid: gridBuffer,
			pieces: newPieces,
		};
	},
};

const gridReducer = (state = initState, action) => {
	return actions[action.type] ? actions[action.type](state, action) : state;
};

function createNewPiece(tetrisPieces) {
	return tetrisPieces['L'];
}

function pieceCollides(grid, origin, piece) {
	let { x, y } = origin;
	const moveAllowed = piece.every(line => {
		const lineRet = line.every((col) => {
			if (grid[y] === undefined && col !== 0 ||
				grid[y] !== undefined && grid[y][x] === undefined && col !== 0) {
				return false;
			}
			x += 1;
				
			return true;
		});
			x = origin.x; /* eslint-disable-line */
		y += 1;
			
		return lineRet;
	});
		
	return moveAllowed;
}
	
function clone2DGrid(grid) {
	return grid.map(line => [ ...line ]);
}

function initGrid() {
	const gridBuffer = [];
	for (let i = 0; i < 20; i += 1) {
		gridBuffer.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
	}

	return gridBuffer;
}

function getUpdatedGrid(gameGrid, origin, piece) {
	const gridCopy = clone2DGrid(gameGrid);
	let { x, y } = origin;
	piece.forEach(line => {
		line.forEach((col) => {
			if (x === gridCopy[0].length && col === 0 ||
				gridCopy[y] === undefined) {
				return;
			}
			gridCopy[y][x] = col;
			x += 1;
		});
		x = origin.x; /* eslint-disable-line */
		y += 1;
	});

	return gridCopy;
}

export default gridReducer;