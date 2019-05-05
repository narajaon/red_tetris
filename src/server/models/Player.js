/**
 * STATES:
 * - connected
 * - started
 * - ended
 * - paused ?
 */


function initGrid() {
	const gridBuffer = [];
	for (let i = 0; i < 20; i += 1) {
		gridBuffer.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
	}

	return gridBuffer;
}

module.exports = class Player {
	constructor(name) {
		this.name = name;
		this.grid = initGrid();
		this.score = 0;
		this.phase = 'arrived';
	}
};
