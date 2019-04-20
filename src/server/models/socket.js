const Piece = require('./piece');

/**
 * TODO:
 * - Handle: 'game-over', 'new-player'
 */

module.exports = class Socket {
	constructor(namespace, io) {
		this.namespace = namespace ? `${namespace}/` : '';
		this.io = io;
	}

	connect() {
		this.io.on(`${this.namespace}connection`, (socket) => {
			console.log('connected');
			socket.on('player-connected', ({ player, room }) => {
				console.log(`${player} is ready in room ${room}`);
			});

			socket.on('game-start', () => {
				const { type } = new Piece();
				console.log('game has started');
				socket.emit('new-piece-event', { piece: type });
			});

			socket.on('game-ended', () => {
				console.log('game has ended');
			});

			socket.on('piece-placed', () => {
				const { type } = new Piece();
				console.log('a piece has been placed');
				socket.emit('new-piece-event', { piece: type });
			});
		});
	}
};
