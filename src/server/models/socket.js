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
			socket.on('player-ready', (any) => {
				console.log('ready');
				socket.emit('new-piece', { piece: new Piece() });
			});

			socket.on('piece-placed', () => {
				socket.emit('new-piece', { piece: new Piece() });
				console.log('a piece has been placed');
			});
		});
	}
};
