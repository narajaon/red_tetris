/**
 * STATES:
 * - connected
 * - started
 * - ended
 * - paused ?
 */
module.exports = class Player {
    constructor() {
        this.grid = new Array(200);
        this.state = 'connected';
    }

    placePiece() {
    }
}