const Piece = require('./Piece');
const Game = require('./Game');
const { GAME_PHASES, MAX_PLAYERS } = require('../constants');

/**
 * TODO:
 * - DEBUG GAME START WHEN SAME AS MASTER
 */

module.exports = class Socket {
	constructor(io) {
		this.io = io;
		this.games = [];
		this.piece = new Piece();
	}

	connect() {
		this.io.on('connection', (client) => {
			console.log('connection established');

			client.on('auth-request', ({ player, room }) => {
				if (!this.credentialsAreValid(player, room)) {
					console.log('BAD CREDENTIALS');

					return;
				}

				const gameOfClient = this.getGameOfRoom(room);

				if (gameOfClient && gameOfClient.players.length + 1 > MAX_PLAYERS) {
					console.log('ROOM IS FULL');

					return;
				}

				if (gameOfClient && gameOfClient.phase !== GAME_PHASES.CONNECTED) {
					console.log('GAME HAS STARTED');

					return;
				}

				this.addPlayerToGame(player, room);
				client.join(room);
				client.emit('phase-switch-event', { phase: GAME_PHASES.CONNECTED });
				this.updatePlayer(player, room, { prop: 'phase', data: GAME_PHASES.CONNECTED });

				this.emitToRoom('update-players', room, {
					players: this.getGameOfRoom(room).players || []
				});
			});

			client.on('start-game', ({ room, player }) => {
				if (this.playerIsMaster(player, room)) {
					console.log(`game in room ${room} started`);
					this.emitToRoom('phase-switch-event', room, {
						phase: GAME_PHASES.STARTED
					});
					this.updatePlayer(player, room, { prop: 'phase', data: GAME_PHASES.STARTED });
				}
			});

			client.on('remove-player', ({ player, room }) => {
				console.log('TO REMOVE', player);

				this.removePlayerFromGame(player, room);
				const { players } = this.getGameOfRoom(room);
				this.emitToRoom('update-players', room, {
					players,
				});
				console.log(this.games);
			});

			client.on('update-grid', ({ grid, player, room }) => {
				this.updatePlayer(player, room, { prop: 'grid', data: grid });
				const { players } = this.getGameOfRoom(room);
				this.emitToRoom('update-players', room, {
					players,
				});
			});

			client.on('piece-request', ({ player, room }) => {
				const pieces = this.piece.getNewPiece();
				console.log(player, 'requested', pieces);
				this.emitToRoom('new-piece-event', room, {
					pieces,
				});
			});
		});
	}

	updatePlayer(playerName, room, { prop, data }) {
		const gameOfRoom = this.getGameOfRoom(room);
		if (!gameOfRoom) return ;
		const playerToUpdate = gameOfRoom.getPlayer(playerName);
		if (playerToUpdate) {
			playerToUpdate[prop] = data;
		}
	}

	playerIsMaster(playerName, room) {
		return playerName === this.getGameOfRoom(room).master;
	}

	emitToRoom(event, room, data) {
		this.io.sockets.to(room).emit(event, data);
	}

	credentialsAreValid(playerName, room) {
		return !this.games.some(game => {
			return game.playerName === playerName && game.room === room;
		});
	}

	getGameOfRoom(room) {
		return this.games.find(game => {
			return game.room === room;
		});
	}

	addPlayerToGame(playerName, room) {
		const gameToInclude = this.games.find(game => {
			return game.room === room;
		});

		if (gameToInclude) {
			return gameToInclude.addPlayer(playerName);
		}

		return this.games.push(new Game(playerName, room));
	}

	removePlayerFromGame(playerName, room) {
		let gameindex;
		const roomToSearch = this.games.find((game, i) => {
			gameindex = i;

			return game.room === room;
		});

		if (!roomToSearch) return;

		roomToSearch.removePlayer(playerName);

		// CHECK IF MASTER DISCONNECTS
		if (playerName === roomToSearch.master && roomToSearch.players.length > 0) {
			roomToSearch.master = roomToSearch.players[0].name;
		}

		// CHECK IF THERES NO PLAYERS LEFT
		if (roomToSearch.players.length === 0) {
			this.games.splice(gameindex, 1);
		}
	}
};
