/**
 * STATES:
 * - connected
 * - started
 * - ended
 * - paused ?
 */

function initGrid() {
	return Array.from(Array(20), () => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}

module.exports = class Player {
	constructor(name, isMaster = false) {
		this.name = name;
		this.grid = initGrid();
		this.score = 0;
		this.phase = 'arrived';
		this.isMaster = isMaster;
	}
};
