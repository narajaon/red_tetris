const Piece = require('./Piece');
const Game = require('./Game');
const { GAME_PHASES, MAX_PLAYERS } = require('../constants');

module.exports = class Socket {
	constructor(io) {
		this.io = io;
		this.games = [];
		this.piece = new Piece();
	}

	connect() {
		this.io.on('connection', (client) => {
			console.log('connection established');
			let playerConnected;
			let roomConnected;

			client.on('auth-request', ({ player, room }) => {
				if (!this.credentialsAreValid(player, room)) {
					// emit error('bad credentials')
					console.log('BAD CREDENTIALS');

					return;
				}

				const gameOfClient = this.getGameOfRoom(room);

				if (gameOfClient && gameOfClient.players.length + 1 > MAX_PLAYERS) {
					// emit error('room is full')
					console.log('ROOM IS FULL');

					return;
				}

				if (gameOfClient && gameOfClient.phase !== GAME_PHASES.CONNECTED) {
					// emit error('game has started)
					console.log('GAME HAS STARTED');

					return;
				}

				this.addPlayerToGame(player, room);
				// client.join(room);
				client.emit('phase-switch-event', { phase: GAME_PHASES.CONNECTED });
				this.updatePlayer(player, room, { prop: 'phase', data: GAME_PHASES.CONNECTED });
				playerConnected = player;
				roomConnected = room;

				this.emitToRoom('update-players', room, {
					players: this.getGameOfRoom(room).players || []
				});

				console.log(this.games);
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

			client.on('disconnect', () => {
				this.removePlayerFromGame(playerConnected, roomConnected);
				console.log(client.sendBuffer);

				console.log(`${playerConnected} is disconnected from ${roomConnected}`);
				const gameOfClient = this.getGameOfRoom(roomConnected) || [];

				// REMOVE SOCKET CONNECTION WHEN GAME IS EMPTY
				if (!gameOfClient.players || gameOfClient.players.length === 0) {
					console.log('GAME IS EMPTY');
					client.removeAllListeners('piece-request');
					
					return;
				}

				this.emitToRoom('update-players', roomConnected, {
					players: gameOfClient.players || []
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
		const playerToUpdate = gameOfRoom.getPlayer(playerName);
		playerToUpdate[prop] = data;
	}

	playerIsMaster(playerName, room) {
		const currentGame = this.getGameOfRoom(room);

		return playerName === currentGame.master;
	}

	emitToRoom(event, room, data) {
		this.io.sockets.in(room).emit(event, data);
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

		let index;
		roomToSearch.players.find((player, i) => {
			index = i;

			return player.name === playerName;
		});

		roomToSearch.removePlayer(index);

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
