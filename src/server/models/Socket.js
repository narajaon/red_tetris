const Game = require('./Game');

module.exports = class Socket {
	constructor(io) {
		this.io = io;
		this.games = [];
	}

	connect(setupListeners) {
		return this.io.on('connection', client => {
			setupListeners(client);
		});
	}

	updatePlayer(playerName, room, option) {
		const gameOfRoom = this.getGameOfRoom(room);
		console.assert(!!gameOfRoom, 'invalid player ' + playerName);
		gameOfRoom.updatePlayer(playerName, option);
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

	getGameOfRoom(room, newMaster) {
		let gameOfRoom = this.games.find(game => {
			return game.room === room;
		});

		if (!gameOfRoom) {
			gameOfRoom = new Game(room, newMaster);
			this.games.push(gameOfRoom);
		}

		return gameOfRoom;
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
		const gameIndex = this.games.findIndex(game => game.room === room);
		const roomToSearch = this.games[gameIndex];

		if(!roomToSearch) return;

		roomToSearch.removePlayer(playerName);

		// CHECK IF MASTER DISCONNECTS
		if (playerName === roomToSearch.master && roomToSearch.players.length > 0) {
			roomToSearch.master = roomToSearch.players[0].name;
		}

		// CHECK IF THERES NO PLAYERS LEFT
		if (roomToSearch.players.length === 0) {
			this.games.splice(gameIndex, 1);
		}
	}
};
