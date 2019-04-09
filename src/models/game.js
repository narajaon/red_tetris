const { Piece, Player } = require('../models')

/**
 * STATES:
 * - connected
 * - started
 * - ended
 * - paused ?
 */
module.exports = class Game {
    constructor(player, room, socket) {
        this.players = [player];
        this.room = room;
        this.state = 'started';
        this.io = io;
        this.socket = socket;
    }

    player(id) {
        return this.players[id];
    }

    addPlayer(player) {
        this.players.push(player);
    }

    generatePiece() {
        const newPiece = new Piece();
        // emit new piece to client
        this.socket.emit('new-piece', newPiece);
    }
}