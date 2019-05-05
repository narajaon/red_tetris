const { TETRIS } = require('../constants');

module.exports = class Piece {
	constructor() {
	}

	getNewPiece() {
		const index = Math.floor(Math.random() * (TETRIS.length));

		return { current: TETRIS[index], name: index };
	}
};
