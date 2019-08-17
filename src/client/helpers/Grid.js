import { TILE, WALLKICKS_I, WALLKICKS } from '../constants';

export function initGrid() {
	return Array.from(Array(20), () => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}

export function createNewPieces({ current, name }) {
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
			return acc2 + (curr2 === TILE.CURRENT ? 1 : 0);
		}, 0);
	};

	const countTilesPlaces = grid.reduce(reducer, 0);

	return countTilesPlaces < 4;
}

export function pieceCanMove(grid, origin, piece) {
	let { x, y } = origin;
	const xOrigin = origin.x;
	const moveAllowed = piece.every(line => {
		const lineRet = line.every(col => {
			if (grid[y] === undefined && col !== TILE.EMPTY) {
				return false;
			}
			
			if (grid[y] && col !== TILE.EMPTY) {
				switch (grid[y][x]) {
				case undefined:
				case TILE.FULL:
				case TILE.BLOCKED:
					return false;
				}
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
		return line.map((_col, x) => {
			return piece[n - x - 1][y];
		});
	});
}

export function removeFullLines(grid) {
	return grid.filter(lines => lines.some(col => col !== TILE.FULL));
}

export function addBlockedLines(grid, blocked, garbage) {
	const updated = clone2DGrid(blocked);
	let i = grid.length - 1;
	let j = blocked.length - 1 - garbage;

	for (j; j >= 0; j -= 1) {
		grid[i].forEach((elem, index) => {
			updated[j][index] = elem;
		});

		i -= 1;
	}

	return updated;
}

export function updateGridWithScore(filtered) {
	const newGrid = initGrid();
	let n = newGrid.length - 1;
	let i = filtered.length - 1;

	for (i; i >= 0; i -= 1) {
		filtered[i].forEach((col, index) => {
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
		return line.map((_col, x) => {
			return rotated[n - x - 1][y];
		});
	});

	return pieceCanMove(grid, origin, rotated);
}

export function wallKick(grid, prevOrigin, newOrigin, piece) {
	const n = piece.length;
	let rotated = clone2DGrid(piece);

	rotated = rotated.map((line, y) => {
		return line.map((_col, x) => {
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
		pieces: { ...pieces, current: rotatedPiece, origin: newOrigin},
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

export	function generateBlockedLines(li) {
	const empty = initGrid();
	let line = li;
	let len = empty.length - 1;

	for (line; line > 0; line -= 1) {
		empty[len].forEach((_elem, i) => {
			empty[len][i] = TILE.BLOCKED;
		});
		len -= 1;
	}

	return empty;
}

export function getUpdatedGrid(gameGrid, origin, piece) {
	const gridCopy = clone2DGrid(gameGrid);
	let { x, y } = origin;
	const xOrigin = origin.x;
	piece.forEach(line => {
		line.forEach((col) => {
			if (x === gridCopy[0].length && col === TILE.EMPTY ||
				gridCopy[y] === undefined) {
				return;
			}

			if (gridCopy[y][x] !== TILE.FULL && 
				gridCopy[y][x] !== TILE.BLOCKED) {
				gridCopy[y][x] = col;
			}

			x += 1;
		});
		x = xOrigin;
		y += 1;
	});

	return gridCopy;
}