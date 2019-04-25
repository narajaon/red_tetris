import chai, { expect } from 'chai';
import reducer from '../../client/reducers/Grid';
import { initGrid, createNewPieces, getUpdatedGrid } from '../../client/helpers/Grid';
import { placePiece, translatePiece, rotatePiece, resetGrid } from '../../client/actions/Grid';
import { TETRIS } from '../../client/constants';

chai.config.truncateThreshold = 0;

describe('grid reducers', () => {
	const emptyGrid = initGrid();
	const initState = {
		grid: emptyGrid,
		pieces: null,
		interval: null,
		overflows: false,
	};

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
		const pieceID = Math.floor(Math.random() * (TETRIS.length));
		const newPieces = createNewPieces({ current: TETRIS[pieceID], name: pieceID });
		const { origin, current } = newPieces;
		const freshGrid = getUpdatedGrid(emptyGrid, origin, current);

		expect(reducer(undefined, placePiece(newPieces))).to.eql({
			grid: freshGrid,
			pieces: newPieces,
			interval: null,
			overflows: false,
		});
	});

	it('should place a piece at default origin and translate it 1 unit at all directions', () => {
		const pieceID = Math.floor(Math.random() * (TETRIS.length));
		const newPieces = createNewPieces({ current: TETRIS[pieceID], name: pieceID });
		const state = reducer(undefined, placePiece(newPieces));

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
			});
		});
	});

	it('should rotate pieces', () => {
		let pieceID = 2;
		let newPieces = createNewPieces({ current: TETRIS[pieceID], name: pieceID });
		let state = reducer(undefined, placePiece(newPieces));

		expect(reducer(state, rotatePiece(newPieces)).pieces.current).to.eql([
			[0, 0, 0],
			[0, 1, 1],
			[1, 1, 0],
		]);

		pieceID = 1;
		newPieces = createNewPieces({ current: TETRIS[pieceID], name: pieceID });
		state = reducer(undefined, placePiece(newPieces));

		expect(reducer(state, rotatePiece(newPieces)).pieces).to.eql({
			...newPieces,
			current: [
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[1, 1, 1, 1],
				[0, 0, 0, 0],
			],
			name: pieceID,
		});
	});

	it('reset-grid', () => {
		let pieceID = 2;
		let newPieces = createNewPieces({ current: TETRIS[pieceID], name: pieceID });
		let state = reducer(undefined, placePiece(newPieces));

		expect(reducer(state, resetGrid())).to.eql(initState);
	});
});