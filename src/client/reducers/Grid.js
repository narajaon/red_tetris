const initState = {
	grid: (() => {
		const gridBuffer = [];
		for (let i = 0; i < 20; i += 1) {
			gridBuffer.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
		}

		return gridBuffer;
	})(),
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

const actions = {
	'update-grid-coord': (state, { coord }) => {
		const gridBuffer = state.grid.map(elem => [ ...elem ]);
		const val = gridBuffer[coord.y][coord.x];
		gridBuffer[coord.y][coord.x] = val === 0 ? 1 : 0;

		return { ...state, grid: gridBuffer };
	},
	'place-piece' : (state, { piece }) => {
		const pieceGrid = tetris[piece];
		const gridBuffer = state.grid.map(elem => [ ...elem ]);
		const origin = { x: 3, y: 0 };
		let { x, y } = origin;
		pieceGrid.forEach(line => {			
			line.forEach(col => {
				gridBuffer[y][x] = col;
				x += 1;
			});
			x = origin.x; /* eslint-disable-line */
			y += 1;
		});

		return { ...state, grid: gridBuffer };
	}
};

const gridReducer = (state = initState, action) => {
	return actions[action.type] ? actions[action.type](state, action) : state;
};

export default gridReducer;