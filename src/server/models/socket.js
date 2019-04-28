const Piece = require('./Piece');
const Game = require('./Game');
const { GAME_PHASES } = require('../constants');

/**
 * TODO:
 * - should listen to player-logged / login + room
 * - on piece-request send it to all other players
 * - Clients should queue new pieces on arrival in Game.pieces
 * - on new-player-connected, queue them in Game.players[]
 * - should assign a game master in Game.master
 * - should change game state on game-master-change-state => connected, started
 * - should listen to all of the game states and change Game.state to ended when all games have ended
 * - should listen to game-master-restart-game to reinitialize games
 */

module.exports = class Socket {
	constructor(io) {
		this.io = io;
		this.games = [];
	}

	connect() {
		this.io.on('connection', (client) => {
			console.log('connection established');
			let playerConnected;
			let roomConnected;
			client.on('new-player-connected-event', ({ player, room }) => {
				console.log(`${player} is ready in room ${room}`);
				this.io.sockets.emit('broadcast', { description: `${player} is ready in room ${room}`});
			});

			client.on('auth-request', ({ player, room }) => {
				console.log(`${player} requested auth in room ${room}`);
				if (this.credentialsAreValid(player, room)) {
					this.addPlayerToGame(player, room);
					client.emit('phase-switch-event', { phase: GAME_PHASES.CONNECTED });
					playerConnected = player;
					roomConnected = room;
					console.log(this.games);
				}
			});

			client.on('piece-request', ({ player, room }) => {
				const { type } = new Piece();
				console.log(`a piece has been requested by ${player} in room ${room}`);
				client.emit('new-piece-event', { pieces: type });
			});

			client.on('disconnect', () => {
				this.removePlayerFromGame(playerConnected, roomConnected);
				console.log(this.games);
			});
		});
	}

	credentialsAreValid(player, room) {
		return !this.games.some(game => {
			return game.player === player && game.room === room;
		});
	}

	addPlayerToGame(player, room) {
		const gameToInclude = this.games.find(game => {
			return game.room === room;
		});

		if (gameToInclude) {
			return gameToInclude.addPlayer(player);
		}

		return this.games.push(new Game(player, room));
	}

	removePlayerFromGame(player, room) {
		let gameindex;
		const roomToSearch = this.games.find((game, i) => {
			gameindex = i;

			return game.room === room;
		});

		if (!roomToSearch) return;

		let index;
		roomToSearch.players.find((current, i) => {
			index = i;

			return current === player;
		});

		// NEED TO CHECK IF MASTER DISCONNECTS
		// if (player === roomToSearch[index].master) {
		// }

		roomToSearch.removePlayer(index);
		if (roomToSearch.players.length === 0) {
			this.games.splice(gameindex, 1);
		}
	}
};
