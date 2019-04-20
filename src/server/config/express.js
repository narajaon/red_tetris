const path = require('path');
const app = require('express')();

/**
 * TODO:
 * - Handle hash-based URLs
 */

function setup() {
	// app.get('/', (req, res) => {
	// 	res.sendFile(path.resolve(`${__dirname}/../../client/index.html`));
	// });

	return app;
}

module.exports = {
	setup,
};
