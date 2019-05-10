const chai = require('chai');

const { expect } = chai;
const Socket = require('../../../server/models/Socket');
const Player = require('../../../server/models/Player');

chai.config.truncateThreshold = 0;

describe('using Socket methods', () => {
	let mockSocket;
	const initPlayer = 'first';
	const initRoom = 1;

	beforeEach(() => {
		mockSocket = new Socket({});
		mockSocket.addPlayerToGame(initPlayer, initRoom);
	});

	it('should update given player', () => {
		const playerName = 'coucou';
		const room = initRoom;

		mockSocket.addPlayerToGame(playerName, room);
		const game = mockSocket.getGameOfRoom(room);
		mockSocket.updatePlayer(playerName, room, { prop: 'score', data: 42 });
		const player = game.getPlayer(playerName);
		const p2 = new Player(playerName);
		expect(player).to.eql({...p2, score: 42 });
		p2.score = 42;
		expect(game.players).to.eql([new Player(initPlayer, true), p2]);
	});

	it('should check credentiel validation', () => {
		const playerName = 'coucou';
		const room = initRoom;

		mockSocket.addPlayerToGame(playerName, room);
		const game = mockSocket.getGameOfRoom(room);
		expect(game.players).to.eql([new Player(initPlayer, true), new Player(playerName)]);
		expect(mockSocket.credentialsAreValid('coucou', room)).to.be.false;
		expect(mockSocket.credentialsAreValid('couco', room)).to.be.true;
	});

	it('shoud remove player from a game and init new master if master is removed', () => {
		const playerName = 'coucou';
		const room = initRoom;

		mockSocket.addPlayerToGame(playerName, room);
		mockSocket.removePlayerFromGame(playerName, room);
		expect(mockSocket.games).to.have.lengthOf(1);
		const game = mockSocket.getGameOfRoom(room);
		expect(game.players).to.eql([new Player(initPlayer, true)]);
		mockSocket.addPlayerToGame(playerName, room);

		// remove master and init new one
		mockSocket.removePlayerFromGame(initPlayer, room);
		expect(game.players).to.eql([new Player(playerName, true)]);
		expect(mockSocket.playerIsMaster(playerName, room)).to.be.true;
		mockSocket.removePlayerFromGame(playerName, room);
		expect(mockSocket.games).to.have.lengthOf(0);
	});

	it('shoud add a new game on new room and remove game on no players', () => {
		const playerName = 'coucou';
		const room = 2;

		mockSocket.addPlayerToGame(playerName, room);
		expect(mockSocket.games).to.have.lengthOf(2);
		mockSocket.removePlayerFromGame(playerName, room);
		expect(mockSocket.games).to.have.lengthOf(1);
	});
});