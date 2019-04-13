const initState = {
	grid: (() => {
		const gridBuffer = [];
		for (let i = 0; i < 200; i++) {
			gridBuffer.push({
				isFull: 0,
				index: i,
			});
		}
		
		return gridBuffer;
	})(),
};

const tetris = {
	'O' : [
		1, 1,
		1, 1,
	],
	'I' : [
		0, 0, 0, 0,
		1, 1, 1, 1,
		0, 0, 0, 0,
		0, 0, 0, 0,
	],
	'S' : [
		0, 0, 0,
		0, 1, 1,
		1, 1, 0,
	],
	'Z' : [
		0, 0, 0,
		1, 1, 0,
		0, 1, 1,
	],
	'L' : [
		0, 0, 0,
		1, 1, 1,
		1, 0, 0,
	],
	'J' : [
		0, 0, 0,
		1, 1, 1,
		0, 0, 1,
	],
	'T' : [
		0, 0, 0,
		1, 1, 1,
		0, 1, 0,
	],
};

const actions = {
	'update-grid-index': (state) => {
		const gridBuffer = state.grid.map((elem, index) => {
			if (index === 4) return { isFull: 1, index };
	
			return elem;
		});
		
		return { ...state, grid: gridBuffer };
	}
};

const gridReducer = (state = initState, { type }) => {
	return actions[type] ? actions[type](state) : state;
};

export default gridReducer;
