const Player = require('./Player');
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
		this.players = [new Player(master, true)];
		this.master = master;
		this.room = room;
	}

	getPlayer(playerName) {
		return this.players.find(player => {
			return player.name === playerName;
		});
	}

	addPlayer(playerName) {
		this.players.push(new Player(playerName));
	}

	removePlayer(playerName) {
		const filtered = this.players.filter(player => player.name !== playerName);
		const playerToRemove = this.players.find(player => player.name === playerName);
		this.players = filtered;

		// Handle master removal
		if (this.players.length > 0 && playerToRemove.isMaster) {
			this.players[0].isMaster = true;
		}
	}
};
