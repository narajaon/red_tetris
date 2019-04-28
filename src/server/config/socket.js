const socketIo = require('socket.io');
const { Socket, Game } = require('../models');

function setup(server) {
	const io = socketIo(server);
	const socket = new Socket(io);
	socket.connect();
}

module.exports = {
	setup,
};
