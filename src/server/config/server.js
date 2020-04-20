module.exports = {
	host: '127.0.0.1',
	port: process.env.PORT || 8080,
	env: process.env.NODE_ENV || 'test',
	get url() {
		return `http://${this.host}:${this.port}`;
	},
};