const { TETRIS } = require('../constants');

module.exports = class Piece {
	constructor() {
		const index = Math.floor(Math.random() * (TETRIS.length));
		this.type = { current: TETRIS[index], name: index };
	}
};
