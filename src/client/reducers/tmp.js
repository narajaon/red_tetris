import Pieces from './Pieces';

const initState = initGrid();

const Grid = (state = initState, action) => {
	const actions = {
		'place-piece' : (state, { piece }) => {
			const { origin, current } = piece;
			const gridBuffer = getUpdatedGrid(state, origin, current);
	
			return [
				...gridBuffer,
			];
		},
		'translate-piece' : (state) => {
			const { origin, current } = Pieces;
			console.log(Pieces);
			
			const gridBuffer = getUpdatedGrid(initGrid(), origin, current);
	
			return [
				...gridBuffer,
			];
		}
	};

	return actions[action.type] ? actions[action.type](state, action) : state;
};

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

function clone2DGrid(gameGrid) {
	return gameGrid.map(line => [ ...line ]);
}

export default Grid;