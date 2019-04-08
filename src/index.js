const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', (socket) => {
	socket.on('player-ready', (data) => {
		console.log(data.player, 'is connected');
	});
});

/**
 * TODO :
 * - emit piece to each players
 * - on 'piece-placed' event:
 * 		- generate new piece
 * 		- emit new piece
 * 		- add it to piece queue
 */

server.listen(8080, () => {
	console.log('server up');
});