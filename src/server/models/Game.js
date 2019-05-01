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
		this.players = [new Player(master)];
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

	removePlayer(index) {
		this.players.splice(index, 1);
	}
};
