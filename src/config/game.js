const { Socket, Player, Game } = require('../models');

function setup(app) {
    const io = require('socket.io')(app);
    const player = new Player();
    const socket = new Socket('', io);
    const game = new Game(player, socket);

    game.start();
}

module.exports = {
    setup,
}