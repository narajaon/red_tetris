import {applyRotationTopiece, attemptWallKicks, getUpdatedGrid, getUpdatedGridWithShadow, initGrid, pieceCanMove, pieceOverflows} from '../../../client/helpers/Grid';
import {fullGrid, pieces} from '../mocks';

describe('pieceOverflows', () => {
	it('should return false when there\'s space left', () => {
		const { origin, current } = pieces;
		const gameGrid = getUpdatedGrid(initGrid(), origin, current);
		expect(pieceOverflows(gameGrid)).toBe(false);
	});

	it('should return true when there\'s no space left', () => {
		const { origin, current } = pieces;
		const gameGrid = getUpdatedGrid(fullGrid, origin, current);
		expect(pieceOverflows(gameGrid)).toBe(true);
	});
});

describe('pieceCanMove', () => {
	it('should return true when piece can still move', () => {
		const { current } = pieces;
		const alteredGrid = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			...fullGrid.slice(2, fullGrid.length)
		];
		const gameGrid = getUpdatedGrid(alteredGrid, {x: 4, y: 0}, current);
		expect(pieceCanMove(gameGrid, {x: 4, y: 1}, current)).toBe(false);
	});

	it('should return false when the grid is full', () => {
		const { current } = pieces;
		const alteredGrid = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			...fullGrid.slice(1, fullGrid.length)
		];

		const gameGrid = getUpdatedGrid(alteredGrid, {x: 3, y: 0}, current);
		expect(pieceCanMove(gameGrid, {x: 3, y: 1}, current)).toBe(false);
	});
});

describe('applyRotationTopiece', () => {
	it('should rotate the piece', () => {
		expect(applyRotationTopiece(pieces.current)).toEqual(
			[
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[1, 1, 1, 1],
				[0, 0, 0, 0],
			]
		);
	});
});

describe('attemptWallKicks', () => {
	it('should rotate the piece', () => {
		expect(attemptWallKicks({...pieces, origin: { x:0, y:0 }}, initGrid()).grid).toEqual(
			[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);
	});


	it('should not move when you can\'t rotate', () => {
		expect(attemptWallKicks({...pieces, origin: { x:0, y:0 }}, fullGrid)).toEqual({});
	});
});

describe('getUpdatedGridWithShadow', () => {
	it('should place a shadow at the bottom', () => {
		const grid = getUpdatedGrid(initGrid(), { x:3, y:0 }, pieces.current);
		expect(getUpdatedGridWithShadow(grid, {x:3, y:0}, pieces.current)).toEqual([[0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 4, 0, 0, 0, 0], [0, 0, 0, 0, 0, 4, 0, 0, 0, 0], [0, 0, 0, 0, 0, 4, 0, 0, 0, 0], [0, 0, 0, 0, 0, 4, 0, 0, 0, 0]]);
	});
});
