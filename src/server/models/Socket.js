const Piece = require('./Piece');
const Game = require('./Game');

module.exports = class Socket {
	constructor(io) {
		this.io = io;
		this.games = [];
		this.piece = new Piece();
	}

	connect(setupListeners) {
		return this.io.on('connection', client => {
			console.log('connection established');
			setupListeners(client);
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
			return game.players.some(player => player.name === playerName && game.room === room);
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
