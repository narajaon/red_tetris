import reducer from '../../client/reducers/Grid';
import { initGrid, createNewPieces, getUpdatedGrid } from '../../client/helpers/Grid';
import { placePiece, translatePiece } from '../../client/actions/Grid';
import { TETRIS } from '../../client/constants';

describe('grid reducers', () => {
	const emptyGrid = initGrid();
	const initState = {
		grid: emptyGrid,
		pieces: null,
		interval: null,
		overflows: false,
	};

	const translations = [
		{ x: 0, y: 1 },
		{ x: -1, y: 0 },
		{ x: 1, y: 1 },
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

	function overrideOrigin(newOrigin, pieces) {
		return {
			...pieces,
			origin: newOrigin,
		};
	}

	it('should return the initial state on empty action', () => {
		expect(reducer(undefined, {})).toEqual(initState);
	});

	it('should return the initial state on unknown action', () => {
		expect(reducer(undefined, { type: 'uknown' })).toEqual(initState);
	});

	it('should place a piece and return a fresh grid', () => {
		const pieceID = Math.floor(Math.random() * (TETRIS.length));
		const newPieces = createNewPieces({ current: TETRIS[pieceID], name: pieceID });
		const { origin, current } = newPieces;
		const freshGrid = getUpdatedGrid(emptyGrid, origin, current);
		expect(reducer(undefined, placePiece(newPieces))).toEqual({
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

		let translatedPieces;
		let freshGrid;
		translations.forEach((tranlation) => {
			translatedPieces = translatePiecesOrigin(tranlation, newPieces);
			freshGrid = getUpdatedGrid(
				emptyGrid,
				translatedPieces.origin,
				translatedPieces.current
			);

			expect(reducer(state, translatePiece(tranlation))).toEqual({
				grid: freshGrid,
				pieces: translatedPieces,
				interval: null,
				overflows: false,
			});
		});
	});

	/**
	 * TODO :
	 * - create pieces with custom default origin that are at the edge of the grid
	 * - translate them at all directions and check if they move
	 */
	it('should place a piece at an edge try to translate it 1 unit at all directions and fail to do so', () => {
		const pieceID = Math.floor(Math.random() * (TETRIS.length));
		const newPieces = createNewPieces({ current: TETRIS[pieceID], name: pieceID });		
		const topLeftOrigin = { x: 0, y: 0 };
		const topRightOrigin = { x: 9, y: 0 };
		const bottomLeftOrigin = { x: 0, y: 9 };
		const bottomRightOrigin = { x: 9, y: 9 };

		const state = reducer(undefined, placePiece(newPieces));

	});
});