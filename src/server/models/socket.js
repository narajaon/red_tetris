const Piece = require('./piece');

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
	constructor(namespace, io) {
		this.namespace = namespace ? `${namespace}/` : '';
		this.io = io;
	}

	connect() {
		this.io.on(`${this.namespace}connection`, (socket) => {
			console.log('connection established');
			socket.on('new-player-connected-event', ({ player, room }) => {
				console.log(`${player} is ready in room ${room}`);
				// console.log(socket.broadcast.emit(`${player} is ready in room ${room}`));
				socket.broadcast.emit(`${player} is ready in room ${room}`);

				// this.io.sockets.emit('broadcast', 'coucou');
				this.io.sockets.emit('broadcast', { description: `${player} is ready in room ${room}`});
			});

			// this.io.sockets.broadcast.emit('new player joined');

			socket.on('game-start', () => {
				const { type } = new Piece();
				console.log('game has started');
				socket.emit('new-piece-event', { pieces: type });
			});

			socket.on('game-ended', () => {
				console.log('game has ended');
			});

			socket.on('piece-request', ({ player, room }) => {
				const { type } = new Piece();
				console.log(`a piece has been requested by ${player} in room ${room}`);
				socket.emit('new-piece-event', { pieces: type });
			});
		});
	}
};
