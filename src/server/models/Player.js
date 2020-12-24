/**
 * STATES:
 * - arrived
 * - connected
 * - started
 * - ended
 */
const { GAME_PHASES } = require('../constants');

function initGrid() {
	return Array.from(Array(20), () => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}

module.exports = class Player {
	constructor(name, isMaster = false) {
		this.name = name;
		this.grid = initGrid();
		this.score = 0;
		this.phase = GAME_PHASES.ARRIVED;
		this.isMaster = isMaster;
	}

	restart() {
		this.grid = initGrid();
		this.score = 0;
	}
};
