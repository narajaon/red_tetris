import { cloneDeep } from 'lodash';
import { tetris, tile } from '../constants';

const initState = {
	grid: initGrid(),
	pieces: createNewPieces(tetris),
};

const actions = {
	'place-piece' : (state) => {
		const { grid, pieces } = state;
		const { origin, current } = pieces;
		const freshGrid = createFreshGrid(grid);
		const gridBuffer = getUpdatedGrid(freshGrid, origin, current);

		return {
			...state,
			pieces,
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
		const canMove = pieceCollides(freshGrid, updatedOrigin, current);
		// can not move down anymore
		if (!canMove && translation.y > 0) {
			return {
				...state,
				grid: blockPieceInGrid(grid),
				pieces: createNewPieces(tetris),
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
		const { origin, current } = pieces;
		const freshGrid = createFreshGrid(grid);
		if (!pieces) return state;
		const pieceCopy = clone2DGrid(current);
		const n = pieceCopy.length;
		const rotated = pieceCopy.map((line, y) => {
			return line.map((col, x) => {
				return pieceCopy[n - x - 1][y];
			});
		});
		const gridBuffer = getUpdatedGrid(freshGrid, origin, rotated);
		const newPieces = { ...cloneDeep(pieces), current: rotated};

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

function createNewPieces(tetrisPieces) {
	const tetrisId = Math.floor(Math.random() * tetris.length);

	return {
		current: [...tetrisPieces[tetrisId]],
		origin: { x: 3, y: 0 },
		name: tetrisId,
		kick: 0,
	};
}

function pieceCollides(grid, origin, piece) {
	let { x, y } = origin;
	const moveAllowed = piece.every(line => {
		const lineRet = line.every((col) => {
			if (grid[y] === undefined && col !== 0 ||
				grid[y] !== undefined && grid[y][x] === undefined && col !== 0 ||
				grid[y] !== undefined && grid[y][x] === tile.FULL && col !== 0) {
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

function createFreshGrid(prevGrid) {
	const newGrid = prevGrid.map(line => {
		return line.map(col => col === tile.CURRENT ? tile.EMPTY : col);
	});

	return newGrid;
}

function blockPieceInGrid(prevGrid) {
	const newGrid = prevGrid.map(line => {
		return line.map(col => col === tile.CURRENT ? tile.FULL : col);
	});

	return newGrid;
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

			gridCopy[y][x] = gridCopy[y][x] === tile.FULL ? tile.FULL : col;
			x += 1;
		});
		x = origin.x; /* eslint-disable-line */
		y += 1;
	});

	return gridCopy;
}

export default gridReducer;