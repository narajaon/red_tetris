import { cloneDeep } from 'lodash';
import { TETRIS, WALLKICKS, WALLKICKS_I, TILE } from '../constants';

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
	'place-piece' : (state) => {
		const { grid, pieces } = state;
		const freshGrid = createFreshGrid(grid);
		const piecesToPlace = pieces || createNewPieces(TETRIS);
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

function createNewPieces(tetrisPieces) {
	const id = Math.floor(Math.random() * TETRIS.length);

	return {
		current: [...tetrisPieces[id]],
		origin: { x: 3, y: 0 },
		name: id,
		kick: 0,
	};
}

function pieceOverflows(grid) {
	const reducer = (acc, curr) => {
		return acc + curr.reduce((acc2, curr2) => {
			return acc2 + (curr2 === 1 ? curr2 : 0);
		}, 0);
	};

	const countTilesPlaces = grid.reduce(reducer, 0);

	return countTilesPlaces < 4;
}

function pieceCanMove(grid, origin, piece) {
	let { x, y } = origin;
	const xOrigin = origin.x;
	const moveAllowed = piece.every(line => {
		const lineRet = line.every((col) => {
			if (grid[y] === undefined && col !== TILE.EMPTY ||
				grid[y] !== undefined && grid[y][x] === undefined && col !== TILE.EMPTY ||
				grid[y] !== undefined && grid[y][x] === TILE.FULL && col !== TILE.EMPTY) {
				return false;
			}
			x += 1;

			return true;
		});
		x = xOrigin;
		y += 1;

		return lineRet;
	});

	return moveAllowed;
}

function removeScoredLines(grid) {
	const filtered = grid.filter(lines => !lines.every(col => col !== 0));
	const newGrid = initGrid();
	let n = newGrid.length - 1;

	for (let i = filtered.length - 1; i >= 0; i -= 1) {
		filtered[i].map((col, index) => {
			newGrid[n][index] = col;
		});
		n -= 1;
	}

	return newGrid;
}

function canWallKick(grid, origin, piece) {
	const n = piece.length;
	let rotated = clone2DGrid(piece);

	rotated = rotated.map((line, y) => {
		return line.map((col, x) => {
			return rotated[n - x - 1][y];
		});
	});
	
	return pieceCanMove(grid, origin, rotated);
}

function wallKick(grid, prevOrigin, newOrigin, piece) {
	const n = piece.length;
	let rotated = clone2DGrid(piece);

	rotated = rotated.map((line, y) => {
		return line.map((col, x) => {
			return rotated[n - x - 1][y];
		});
	});

	if (pieceCanMove(grid, newOrigin, rotated)) {
		return { piece: rotated, origin: newOrigin };
	}

	return { piece, origin: prevOrigin };
}

function iterWallKicks(freshGrid, origin, current, wallkicks) {
	let translatedOrigin;

	const kicks = wallkicks.some(translation => {
		translatedOrigin = {
			x: origin.x + translation.x,
			y: origin.y + translation.y,
		};

		if (canWallKick(freshGrid, translatedOrigin, current)) return true;

		return false;
	});

	return kicks ? translatedOrigin : null;
}

function attemptWallKicks(pieces, current, freshGrid) {
	const { origin } = pieces;
	let translatedOrigin = iterWallKicks(freshGrid, origin, current, WALLKICKS);

	if (!translatedOrigin && pieces.name === 1) {
		translatedOrigin = iterWallKicks(freshGrid, origin, current, WALLKICKS_I);
	}

	if (!translatedOrigin) return {};

	const {
		piece: rotatedPiece,
		origin : newOrigin
	} = wallKick(freshGrid, origin, translatedOrigin, current);
	const newGrid = getUpdatedGrid(freshGrid, newOrigin, rotatedPiece);

	return {
		grid: newGrid,
		pieces: { ...cloneDeep(pieces), current: rotatedPiece, origin: newOrigin},
	};
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
		return line.map(col => col === TILE.CURRENT ? TILE.EMPTY : col);
	});

	return newGrid;
}

function blockPieceInGrid(prevGrid) {
	const newGrid = prevGrid.map(line => {
		return line.map(col => col === TILE.CURRENT ? TILE.FULL : col);
	});

	return newGrid;
}

function getUpdatedGrid(gameGrid, origin, piece) {
	const gridCopy = clone2DGrid(gameGrid);
	let { x, y } = origin;
	const xOrigin = origin.x;
	piece.forEach(line => {
		line.forEach((col) => {

			if (x === gridCopy[0].length && col === 0 ||
				gridCopy[y] === undefined) {
				return;
			}

			gridCopy[y][x] = gridCopy[y][x] === TILE.FULL ? TILE.FULL : col;
			x += 1;
		});
		x = xOrigin;
		y += 1;
	});

	return gridCopy;
}

export default gridReducer;