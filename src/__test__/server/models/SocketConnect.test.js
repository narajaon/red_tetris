const chai = require('chai');

const { expect } = chai;
const Socket = require('../../../server/models/Socket');
const Player = require('../../../server/models/Player');
const handlers = require('../../../server/socketHandlers');
const { MAX_PLAYERS } = require('../../../server/constants');
const { GAME_PHASES } = require('../../../server/constants');

chai.config.truncateThreshold = 0;

describe('using Socket methods', () => {
	let mockSocket;
	let eventsToRoom = [];
	let eventsToPlayer = [];
	let emittedToRoom = [];

	const fakeScore = {
		lines: 0,
		total: 0,
		garbage: 0,
	};

	const mockIO = {
		on: () => null,
		sockets: {
			to: (room) => {
				return {
					emit: (event) => {
						return eventsToRoom.push({ event, room });
					}
				};
			},
		},
	};
	const mockClient = {
		join: () => null,
		emit: event => eventsToPlayer.push(event),
		to: room => {
			return {
				emit: (event, param) => emittedToRoom.push({ room, event, param })
			};
		},
	};
	const id = { player: 'player1', room: 1 };
	const id2 = { player: 'player2', room: 1 };
	const id3 = { player: 'player3', room: 1 };
	const id4 = { player: 'player4', room: 1 };

	beforeEach(() => {
		mockSocket = new Socket(mockIO);
		for (const event in handlers) {
			mockSocket[event] = handlers[event];
		}
	});

	afterEach(() => {
		eventsToRoom = [];
		eventsToPlayer = [];
	});

	it('shoud add a player on auth-request', () => {		
		mockSocket['auth-request'](mockClient)(id);
		expect(mockSocket.games).to.have.lengthOf(1);

		// bad credentials
		mockSocket['auth-request'](mockClient)(id);
		expect(mockSocket.games).to.have.lengthOf(1);

		const game = mockSocket.getGameOfRoom(1);
		expect(game.players[0]).to.eql({
			...new Player('player1', true),
			phase: 'connected'
		});

		mockSocket['auth-request'](mockClient)(id2);
		expect(mockSocket.games).to.have.lengthOf(1);
		expect(game.players).to.have.lengthOf(2);

		mockSocket['auth-request'](mockClient)(id3);
		mockSocket['auth-request'](mockClient)(id4);
		mockSocket['auth-request'](mockClient)({ player: 'player5', room: 1 });
		expect(game.players).to.have.lengthOf(MAX_PLAYERS);
	});

	it('shoud remove a player on remove-player', () => {
		mockSocket['auth-request'](mockClient)(id);
		expect(mockSocket.games).to.have.lengthOf(1);
		mockSocket['remove-player'](mockClient)(id);
		expect(mockSocket.games).to.have.lengthOf(0);
		mockSocket['remove-player'](mockClient)(id2);
		expect(mockSocket.games).to.have.lengthOf(0);
	});

	it('should update the grid of a particular player', () => {
		mockSocket['auth-request'](mockClient)(id);
		const modifiedGrid = Array.from(Array(20), () => [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
		mockSocket['update-grid'](mockClient)({...id, grid: modifiedGrid, score: fakeScore });
		const game = mockSocket.getGameOfRoom(1);
		const player = game.players.find(p => p.name === id.player);
		expect(player).to.eql({
			...new Player(id.player, true),
			phase: 'connected',
			grid: modifiedGrid,
		});
	});

	it('should emit new piece', () => {		
		mockSocket['piece-request'](mockClient)(id);
		expect(eventsToRoom).to.have.lengthOf(1);
		mockSocket['piece-request'](mockClient)(id);
		mockSocket['piece-request'](mockClient)(id);
		mockSocket['piece-request'](mockClient)(id);
		expect(eventsToRoom).to.have.lengthOf(4);
	});

	it('should emit phase-switch-event to all players', () => {
		mockSocket['auth-request'](mockClient)(id);
		mockSocket['auth-request'](mockClient)(id2);
		mockSocket['auth-request'](mockClient)(id3);		
		expect(eventsToRoom).to.have.lengthOf(3);
		mockSocket['start-game'](mockClient)(id);
		expect(eventsToRoom).to.have.lengthOf(4);
		const game = mockSocket.getGameOfRoom(1);
		const player = game.players.find(p => p.name === id.player);
		expect(player.phase).to.equal(GAME_PHASES.STARTED);
	});

	it('should update player and emit to room on switch phase', () => {
		mockSocket['auth-request'](mockClient)(id);
		mockSocket['switch-phase'](mockClient)({ ...id, phase: GAME_PHASES.STARTED });
		expect(eventsToRoom).to.have.lengthOf(2);
		expect(eventsToPlayer).to.have.lengthOf(2);
		mockSocket['remove-player'](mockClient)(id);
		expect(eventsToRoom).to.have.lengthOf(2);
	});
});