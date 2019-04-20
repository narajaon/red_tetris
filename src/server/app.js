const http = require('http');
const config = require('./config');

let app;
let server;

async function start() {
	if (app) return app;

	// SETUP SERVER
	app = config.express.setup();
	server = http.Server(app);
	// SETUP GAME
	config.game.setup(server);
	// START SERVER
	await server.listen(config.server.port);

	return app;
}

async function stop() {
	await server.close();
	server = null;
	app = null;
}

start();

/**
 * TODO :
 * - Handle different rooms
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
