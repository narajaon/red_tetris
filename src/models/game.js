class Game {
    isOver = false;

    constructor(players, room) {
        this.players = players;
        this.room = room;
    }

    get player(id) {
        return this.players[id];
    }

    addPlayer(player) {
        this.players.push(player);
    }
}

module.exports = Game;