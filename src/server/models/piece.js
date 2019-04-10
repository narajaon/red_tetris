const types = [
	[0, 1, 1, 0, 1],
	[0, 1, 0, 0, 0],
	[0, 1, 0, 0, 1],
	[1, 1, 1, 0, 1],
	[0, 1, 0, 0, 0],
	[0, 1, 1, 0, 1],
	[1, 1, 0, 1, 1],
];

module.exports = class Piece {
	constructor() {
		const index = Math.floor(Math.random() * (types.length));
		this.type = types[index];
	}
};
