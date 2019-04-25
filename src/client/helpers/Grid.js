import { cloneDeep } from 'lodash';
import { TILE, WALLKICKS_I, WALLKICKS } from '../constants';

export function initGrid() {
	const gridBuffer = [];
	for (let i = 0; i < 20; i += 1) {
		gridBuffer.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
	}

	return gridBuffer;
}

export function createNewPieces(pieces) {
	const { current, name } = pieces;

	return {
		current,
		origin: { x: 3, y: 0 },
		name,
		kick: 0,
	};
}

export function pieceOverflows(grid) {
	const reducer = (acc, curr) => {
		return acc + curr.reduce((acc2, curr2) => {
			return acc2 + (curr2 === 1 ? curr2 : 0);
		}, 0);
	};

	const countTilesPlaces = grid.reduce(reducer, 0);

	return countTilesPlaces < 4;
}

export function pieceCanMove(grid, origin, piece) {
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

export function applyRotationTopiece(piece) {
	const n = piece.length;
	
	return piece.map((line, y) => {
		return line.map((col, x) => {
			return piece[n - x - 1][y];
		});
	});	
}

export function removeScoredLines(grid) {
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

export function canWallKick(grid, origin, piece) {
	const n = piece.length;
	let rotated = clone2DGrid(piece);

	rotated = rotated.map((line, y) => {
		return line.map((col, x) => {
			return rotated[n - x - 1][y];
		});
	});

	return pieceCanMove(grid, origin, rotated);
}

export function wallKick(grid, prevOrigin, newOrigin, piece) {
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

export function iterWallKicks(freshGrid, origin, current, wallkicks) {
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

export function attemptWallKicks(pieces, current, freshGrid) {
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

export function clone2DGrid(grid) {
	return grid.map(line => [ ...line ]);
}

export function createFreshGrid(prevGrid) {
	const newGrid = prevGrid.map(line => {
		return line.map(col => col === TILE.CURRENT ? TILE.EMPTY : col);
	});

	return newGrid;
}

export function blockPieceInGrid(prevGrid) {
	const newGrid = prevGrid.map(line => {
		return line.map(col => col === TILE.CURRENT ? TILE.FULL : col);
	});

	return newGrid;
}

export function getUpdatedGrid(gameGrid, origin, piece) {
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