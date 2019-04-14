const initState = {
	grid: initGrid(),
	currentPiece: null,
	currentOrigin: { x: 3, y: 0},
	currentPieceName: '',
	currentKick: 0,
};

const tetris = {
	'O' : [
		[1, 1],
		[1, 1],
	],
	'I' : [
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
	],
	'S' : [
		[0, 1, 0],
		[0, 1, 1],
		[0, 0, 1],
	],
	'Z' : [
		[0, 0, 1],
		[0, 1, 1],
		[0, 1, 0],
	],
	'L' : [
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 1],
	],
	'J' : [
		[0, 1, 1],
		[0, 1, 0],
		[0, 1, 0],
	],
	'T' : [
		[0, 1, 0],
		[0, 1, 1],
		[0, 1, 0],
	],
};

/**
 * TODO :
 * - Create full tile state
 * - Handle collisions
 * - Place Piece
 * - Generate new piece
 */

const actions = {
	'place-piece' : (state, { currentPieceName }) => {
		const { currentOrigin, grid } = state;
		const pieceGrid = tetris[currentPieceName];
		const { gridBuffer, moveAllowed } = getUpdatedGrid(grid, currentOrigin, pieceGrid);

		return {
			...state,
			grid: gridBuffer,
			currentPiece: pieceGrid,
			currentOrigin,
			currentPieceName
		};
	},
	'rotate-piece' : (state) => {
		const { currentOrigin, grid, currentPiece } = state;
		if (!currentPiece) return state;
		const pieceGrid = clone2DGrid(state.currentPiece);
		const n = pieceGrid.length;
		const rotated = pieceGrid.map((line, y) => {
			return line.map((col, x) => {
				return pieceGrid[n - x - 1][y];
			});
		});
		const { gridBuffer, moveAllowed } = getUpdatedGrid(initGrid(), currentOrigin, rotated);

		return { ...state, grid: gridBuffer, currentPiece: rotated };
	},
	'translate-piece' : (state, { translationCoord }) => {
		const { currentOrigin, currentPiece, grid, currentKick } = state;
		if (!currentPiece) return state;
		const updatedOrigin = {
			x: currentOrigin.x + translationCoord.x,
			y: currentOrigin.y + translationCoord.y,
		};

		// REPLACE INIT GRID WITH GRID AND CHECK IF GRID[Y][X] IS NOT EMPTY
		const { gridBuffer, moveAllowed } = getUpdatedGrid(initGrid(), updatedOrigin, currentPiece);
		const definitiveOrigin = moveAllowed === true ? updatedOrigin : currentOrigin;
		console.log(updatedOrigin, currentOrigin);

		return { ...state, currentOrigin: definitiveOrigin, grid: gridBuffer };
	}
};

const gridReducer = (state = initState, action) => {
	return actions[action.type] ? actions[action.type](state, action) : state;
};

export default gridReducer;

function initGrid() {
	const gridBuffer = [];
	for (let i = 0; i < 20; i += 1) {
		gridBuffer.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
	}

	return gridBuffer;
}

function getUpdatedGrid(grid, origin, piece) {
	const gridBuffer = clone2DGrid(grid);
	let { x, y } = origin;
	const moveAllowed = piece.every(line => {
		const lineRet = line.every((col) => {
			if ((gridBuffer[y] === undefined) ||
				(gridBuffer[y][x] === undefined && col !== 0) ||
				(x === 10)) {
				return false;
			}
			gridBuffer[y][x] = col;
			x += 1;

			return true;
		});
		x = origin.x; /* eslint-disable-line */
		y += 1;

		return lineRet;
	});

	return { gridBuffer, moveAllowed };
}

function clone2DGrid(grid) {
	return grid.map(line => [ ...line ]);
}
