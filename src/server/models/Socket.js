const Piece = require('./Piece');
const Game = require('./Game');
const { GAME_PHASES, MAX_PLAYERS } = require('../constants');

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

			client.on('auth-request', ({ player, room }) => {
				if (!this.credentialsAreValid(player, room)) {
					// emit error('bad credentials')
					return;
				}

				const gameOfClient = this.getGameOfRoom(room);

				if (gameOfClient && gameOfClient.players.length + 1 > MAX_PLAYERS) {
					// emit error('room is full')
					return;
				}
				
				if (gameOfClient && gameOfClient.phase !== GAME_PHASES.CONNECTED) {
					// emit error('game has started)
					return;
				}

				this.addPlayerToGame(player, room);
				client.join(room);
				client.emit('phase-switch-event', { phase: GAME_PHASES.CONNECTED });
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
				}
			});

			client.on('disconnect', () => {
				this.removePlayerFromGame(playerConnected, roomConnected);
				const gameOfClient = this.getGameOfRoom(roomConnected) || [];

				// REMOVE SOCKET CONNECTION WHEN GAME IS EMPTY
				// if (gameOfClient.players.length === 0) {
					
				// }

				this.emitToRoom('update-players', roomConnected, {
					players: gameOfClient.players || []
				});

				console.log(this.games);
			});

			client.on('update-grid', ({ grid, player, room }) => {
				this.updateGridOfplayer(player, grid, room);
				const { players } = this.getGameOfRoom(room);
				this.emitToRoom('update-players', room, {
					players,
				});
			});

			client.on('piece-request', ({ player, room }) => {
				const { type } = new Piece();
				console.log(player, 'requested', type);
				this.emitToRoom('new-piece-event', room, {
					pieces: type,
				});
				// this.io.volatile.to(room).emit('new-piece-event', {
				// 	pieces: type,
				// });

			});
		});
	}

	updateGridOfplayer(playerName, grid, room) {
		const roomToSearch = this.getGameOfRoom(room);
		const playerToFind = roomToSearch.getPlayer(playerName);
		playerToFind.updateGrid(grid);
	}

	playerIsMaster(playerName, room) {
		const currentGame = this.getGameOfRoom(room);

		return playerName === currentGame.master;
	}

	emitToRoom(event, room, data) {
		this.io.to(room).emit(event, data);
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
