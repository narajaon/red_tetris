import actionCreator from '../actions';

const initState = {
	current: createNewPiece(actionCreator.tetris),
	origin: { x: 3, y: 0 },
	name: '',
	kick: 0,
};

const Pieces = (state = initState, action) => {
	const actions = {
		'rotate-piece' : (state, { current }) => {
			if (!current) return state;
			const pieceGrid = clone2DGrid(current);
			const n = pieceGrid.length;
			const rotated = pieceGrid.map((line, y) => {
				return line.map((col, x) => {
					return pieceGrid[n - x - 1][y];
				});
			});

			return { ...state, current: rotated };
		},
		'translate-piece' : (state, { piece, grid }) => {
			const translationCoord = piece.origin;
			const { origin, current, kick } = state;
			if (!current) return state;
			const updatedOrigin = {
				x: origin.x + translationCoord.x,
				y: origin.y + translationCoord.y,
			};
			const canMove = pieceCollides(grid, updatedOrigin, current);
			if (!canMove) return state;
			
			return { ...state, origin: updatedOrigin };
		}
	};
	
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