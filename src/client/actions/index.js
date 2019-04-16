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
const placePiece = (piece) => ({ type: 'place-piece', piece });
const rotatePiece = () => ({ type: 'rotate-piece' });
const translatePiece = (newOrigin) => ({ type: 'translate-piece', origin: newOrigin });

export default {
	tetris,
	placePiece,
	rotatePiece,
	translatePiece
};