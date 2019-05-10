import chai, { expect, assert } from 'chai';
import reducer from '../../../client/reducers/Grid';
import { initGrid, getUpdatedGrid, createNewPieces } from '../../../client/helpers/Grid';
import { placePiece, translatePiece, rotatePiece, resetGrid, startAnimation, queuePieces, popPieces } from '../../../client/actions/Grid';
import { TETRIS } from '../../../client/constants';

chai.config.truncateThreshold = 0;

describe('grid reducers', () => {
	const emptyGrid = initGrid();
	const pieceID = Math.floor(Math.random() * (TETRIS.length));
	const newPieces = createNewPieces({ current: TETRIS[pieceID], name: pieceID });
	const initState = {
		grid: emptyGrid,
		pieces: null,
		interval: null,
		overflows: false,
		piecesQueue: [],
	};

	const stateWithPiece = { ...initState, pieces: newPieces };

	const translations = [
		{ x: -1, y: 0 },
		{ x: 1, y: 0 },
		{ x: 0, y: 1 },
	];

	function translatePiecesOrigin(translation, pieces) {
		return {
			...pieces,
			origin: {
				x: pieces.origin.x + translation.x,
				y: pieces.origin.y + translation.y,
			}
		};
	}

	it('should return the initial state on empty action', () => {
		expect(reducer(undefined, {})).to.eql(initState);
	});

	it('should return the initial state on unknown action', () => {
		expect(reducer(undefined, { type: 'uknown' })).to.eql(initState);
	});

	it('should place a piece and return a fresh grid', () => {
		const { grid } = initState;
		const { origin, current } = newPieces;
		const freshGrid = getUpdatedGrid(grid, origin, current);

		expect(reducer(stateWithPiece, placePiece())).to.eql({
			grid: freshGrid,
			pieces: newPieces,
			interval: null,
			overflows: false,
			piecesQueue: [],
		});
	});

	it('should place a piece at default origin and translate it 1 unit at all directions', () => {
		const state = reducer(stateWithPiece, placePiece());

		translations.forEach((tranlation) => {
			const translatedPieces = translatePiecesOrigin(tranlation, newPieces);
			const freshGrid = getUpdatedGrid(
				emptyGrid,
				translatedPieces.origin,
				translatedPieces.current
			);

			expect(reducer(state, translatePiece(tranlation))).to.eql({
				grid: freshGrid,
				pieces: translatedPieces,
				interval: null,
				overflows: false,
				piecesQueue: [],
			});
		});
	});

	it('should rotate pieces', () => {
		let id = 2;
		let piece = createNewPieces({ current: TETRIS[id], name: id });
		let state = reducer({ ...initState, pieces: piece }, placePiece());

		expect(reducer(state, rotatePiece()).pieces.current).to.eql([
			[0, 0, 0],
			[0, 1, 1],
			[1, 1, 0],
		]);

		id = 1;
		piece = createNewPieces({ current: TETRIS[id], name: id });
		state = reducer({ ...initState, pieces: piece }, placePiece());

		expect(reducer(state, rotatePiece()).pieces).to.eql({
			...piece,
			current: [
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[1, 1, 1, 1],
				[0, 0, 0, 0],
			],
		});
	});

	it('reset-grid', () => {
		let id = 2;
		let piece = createNewPieces({ current: TETRIS[id], name: id });
		let state = reducer({ ...initState, pieces: piece }, placePiece());

		expect(reducer(state, resetGrid())).to.eql(initState);
	});

	it('should set interval to non null', () => {
		expect(reducer(initState, startAnimation(1)).interval).to.eql(1);
	});

	it('should queue new piece in pieceQueue and remove it', () => {
		expect(reducer(initState, queuePieces(newPieces)).piecesQueue).to.eql([newPieces]);
		expect(reducer(initState, popPieces()).piecesQueue).to.eql([]);
	});
});