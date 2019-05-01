/**
 * STATES:
 * - connected
 * - started
 * - ended
 * - paused ?
 */
module.exports = class Player {
	constructor(name) {
		this.name = name;
		this.grid = null;
		this.score = 0;
		this.phase = 'connected';
	}

	updateGrid(grid) {
		this.grid = grid;
	}
};
