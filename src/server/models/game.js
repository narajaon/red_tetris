/**
 * STATES:
 * - connected
 * - started
 * - ended
 * - paused ?
 */
module.exports = class Game {
	constructor(master, room) {
		this.phase = 'connected';
		this.players = [master];
		this.master = master;
		this.room = room;
	}

	getPlayer(id) {
		return this.players[id];
	}

	addPlayer(player) {
		this.players.push(player);
	}

	removePlayer(index) {
		this.players.splice(index, 1);
	}
};
