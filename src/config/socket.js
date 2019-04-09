const { Socket } = require('../models');

function onNewPlayer(socket) {
    socket.on('player-ready', (data) => {
        console.log(data.player, 'is connected');
        socket.emit('NICE');
    });
}

function setup(server) {
    const io = require('socket.io')(server);
    const socket = new Socket('', io);
    socket.connect(onNewPlayer);
}

module.exports = {
    setup,
}