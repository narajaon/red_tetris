const path = require('path');
const express = require('express');
const serverConf = require('./server');

const app = express();
const staticDir = serverConf.env === 'test' ? '../static/' : '/../../../build/';

function setup() {
	app.use(express.static(path.join(__dirname, staticDir)));

	app.get('/', (_, res) => {
		res.sendFile(path.join(__dirname, staticDir, 'index.html'));
	});


	app.get('*', (_, __, next) => {
		let err = new Error('Page Not Found');
		err.statusCode = 404;
		next(err);
	});

	return app;
}

module.exports = {
	setup,
};
