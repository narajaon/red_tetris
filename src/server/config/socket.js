const socketIo = require('socket.io');
const { Socket } = require('../models');
const handlers = require('../socketHandlers');

function setup(server) {
	const io = socketIo(server);
	const socket = new Socket(io);

	socket.connect(function (client) {
		for (const event in handlers) {
			client.on(event, handlers[event].bind(socket)(client));
		}
	});
}

module.exports = {
	setup,
};
