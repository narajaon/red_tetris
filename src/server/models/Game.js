const { GAME_PHASES } = require('../constants');
const Piece = require('./Piece');
const Player = require('./Player');

module.exports = class Game {
	constructor(master, room) {
		this.players = [new Player(master, true)];
		this.master = master;
		this.room = room;
		this.piece = new Piece();
	}

	arePlayersReady() {
		return this.players.every((player) => player.phase === GAME_PHASES.CONNECTED);
	}

	restart() {
		this.piece = new Piece();
		this.players.forEach((player) => {
			player.restart();
		});
	}

	getPlayer(playerName) {
		return this.players.find(player => {
			return player.name === playerName;
		});
	}

	updatePlayer(playerName, { prop, data }) {
		const player = this.players.find(p => p.name === playerName);
		player[prop] = data;
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
