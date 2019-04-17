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
		const canMove = pieceCanMove(freshGrid, updatedOrigin, current);
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
		if (!pieceCanMove(freshGrid, origin, rotated)){
			const translatedOrigin = {
				x: origin.x + 1,
				y: origin.y,
			};
			if (!canWallKick(freshGrid, translatedOrigin, current)) return state;
			const { piece: rotatedPiece , origin : newOrigin } = wallKick(freshGrid, origin, translatedOrigin, current);
			console.log(rotatedPiece, newOrigin, origin);
			
			const newGrid = getUpdatedGrid(freshGrid, newOrigin, rotatedPiece);
			
			return {
				...state,
				grid: newGrid,
				pieces: { ...cloneDeep(pieces), current: rotatedPiece, origin: newOrigin},
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
	return actions[action.type] ? actions[action.type](state, action) : state;
};

function createNewPieces(tetrisPieces) {
	const tetrisId = Math.floor(Math.random() * tetris.length);

	return {
		current: [...tetrisPieces[1]],
		origin: { x: 3, y: 0 },
		name: tetrisId,
		kick: 0,
	};
}

function pieceCanMove(grid, origin, piece) {
	let { x, y } = origin;
	const xOrigin = origin.x;
	const moveAllowed = piece.every(line => {
		const lineRet = line.every((col) => {
			if (grid[y] === undefined && col !== tile.EMPTY ||
				grid[y] !== undefined && grid[y][x] === undefined && col !== tile.EMPTY ||
				grid[y] !== undefined && grid[y][x] === tile.FULL && col !== tile.EMPTY) {
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

function canWallKick(grid, origin, piece) {
	const n = piece.length;
	let rotated = clone2DGrid(piece);

	for (let rota = 0; rota < 3; rota += 1) {
		rotated = rotated.map((line, y) => {
			return line.map((col, x) => {
				return rotated[n - x - 1][y];
			});
		});

		if (pieceCanMove(grid, origin, rotated)) {
			console.log('ROTATIONS', rota);
			
			return true;
		}
	}

	return false;
}

/**
 * TODO :
 * - handle -x and +y wallkicks
 * - fix I weird wallkick
 */
function wallKick(grid, prevOrigin, newOrigin, piece) {
	const n = piece.length;
	let rotated = clone2DGrid(piece);
	console.log(prevOrigin, newOrigin);

	for (let rota = 0; rota < 3; rota += 1) {
		rotated = rotated.map((line, y) => {
			return line.map((col, x) => {
				return rotated[n - x - 1][y];
			});
		});

		if (pieceCanMove(grid, newOrigin, rotated)) {
			console.log('TRUE');
			
			return { piece: rotated, origin: newOrigin };
		}
	}
	console.log('FALSE');

	return { piece, origin: prevOrigin };
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
	const xOrigin = origin.x;
	piece.forEach(line => {
		line.forEach((col) => {
			if (x === gridCopy[0].length && col === 0 ||
				gridCopy[y] === undefined) {
				return;
			}

			gridCopy[y][x] = gridCopy[y][x] === tile.FULL ? tile.FULL : col;
			x += 1;
		});
		x = xOrigin;
		y += 1;
	});

	return gridCopy;
}

export default gridReducer;