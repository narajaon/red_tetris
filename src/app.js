const config = require('./config');

let app;
let server;

function start(){
	if (app) return app;
	app = require('express')();
	server = require('http').Server(app);

	// SETUP SERVER
	config.express.setup(app);
	// SETUP SOCKET EVENTS
	config.game.setup(server);
	// START SERVER
	server.listen(config.server.port);
	console.log('server UP on', config.server.port);
}

async function stop() {
	if (server) {
	  await server.close();
	  server = null;
	  app = null;
	}
	return Promise.resolve();
}

start();

/**
 * TODO :
 * - emit piece to each players
 * - on 'piece-placed' event:
 * 		- generate new piece
 * 		- emit new piece
 * 		- add it to piece queue
 */

module.exports = {
	start,
	stop,
	get app() {
		return app;
	},
	get server() {
		return server;
	}
}