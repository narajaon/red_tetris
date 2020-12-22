const { GAME_PHASES, MAX_PLAYERS } = require('./constants');

module.exports = {
	'auth-request' : function (client) {
		return ({ player, room }) => {
			if (!this.credentialsAreValid(player, room)) {
				console.log('BAD CREDENTIALS');
				
				return;
			}

			const gameOfClient = this.getGameOfRoom(room);

			if (gameOfClient && gameOfClient.players.length + 1 > MAX_PLAYERS) {
				console.log('ROOM IS FULL');

				return;
			}

			this.addPlayerToGame(player, room);
			client.join(room);
			client.emit('phase-switch-event', { phase: GAME_PHASES.CONNECTED });
			this.updatePlayer(player, room, { prop: 'phase', data: GAME_PHASES.CONNECTED });

			const playersInRoom = this.getGameOfRoom(room).players || [];
			this.emitToRoom('update-players', room, {
				players: playersInRoom
			});
			console.log('Players in game : ', playersInRoom.length);
		};
	},
	'start-game': function () {
		return ({ room, player }) => {
			if (this.playerIsMaster(player, room)) {
				console.log(`game in room ${room} started`);
				this.emitToRoom('phase-switch-event', room, { phase: GAME_PHASES.STARTED });
				this.updatePlayer(player, room, { prop: 'phase', data: GAME_PHASES.STARTED });
			}
		};
	},
	'switch-phase': function (client) {
		return ({ player, room, phase }) => {
			console.log('SWITCH', phase);

			client.emit('phase-switch-event', { phase });
			const game = this.getGameOfRoom(room);

			// No more games in ROOM
			if (!game) return ;

			game.updatePlayer(player, { propName: 'phase', prop: phase });
			this.emitToRoom('update-players', room, {
				players: game.players,
			});
		};
	},
	'remove-player': function () {
		return ({ player, room }) => {
			console.log('TO REMOVE', player);
			this.removePlayerFromGame(player, room);
			const game = this.getGameOfRoom(room);
			if (!game || !game.players ) return;

			this.emitToRoom('update-players', room, {
				players: game.players,
			});
		};
	},
	'update-grid': function (client) {
		return ({ grid, score , player, room }) => {
			this.updatePlayer(player, room, { prop: 'grid', data: grid });
			this.updatePlayer(player, room, { prop: 'score', data: score.total });
			const { players } = this.getGameOfRoom(room);
			if (score.lines > 0) {
				client.to(room).emit('add-garbage-event', { lines: score.lines });
			}
			client.to(room).emit('update-players', {
				players,
			});
		};
	},
	'piece-request': function () {
		return ({ player, room }) => {
			const game = this.getGameOfRoom(room);

			if (!game) return;

			const pieces = game.piece.getNewPiece();
			console.log(player, 'requested', pieces);
			this.emitToRoom('new-piece-event', room, {
				pieces,
			});
		};
	}
};
