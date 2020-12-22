const Piece = require('./Piece');
const Player = require('./Player');

module.exports = class Game {
	constructor(master, room) {
		this.phase = 'connected';
		this.players = [new Player(master, true)];
		this.master = master;
		this.room = room;
		this.piece = new Piece();
	}

	getPlayer(playerName) {
		return this.players.find(player => {
			return player.name === playerName;
		});
	}

	updatePlayer(playerName, { propName, prop }) {
		const player = this.players.find(p => p.name === playerName);
		player[propName] = prop;
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
