const path = require('path');

/**
 * STATES:
 * - connected
 * - started
 * - ended
 * - paused ?
 */
module.exports = class Game {
    constructor(player, socket) {
        this.state = 'started';
        this.players = [player];
        this.socket = socket;
    }

    player(id) {
        return this.players[id];
    }

    addPlayer(player) {
        this.players.push(player);
    }

    start() {
        this.socket.connect();
    }
}