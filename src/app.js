const http = require('http');
const config = require('./config');

let app;
let server;

function start() {
	// SETUP SERVER
	app = config.express.setup();
	server = http.Server(app);
	// SETUP SOCKET EVENTS
	config.game.setup(server);
	// START SERVER
	server.listen(config.server.port);
}

async function stop() {
	await server.close();
	server = null;
	app = null;
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
	},
};
