import chai, { expect } from 'chai';
import reducer from '../../../client/reducers/Game';
import { restartGame, initPlayerAndRoom, updatePlayers, switchPhase } from '../../../client/actions/Game';
import { PHASES } from '../../../client/constants';
import { initGrid } from '../../../client/helpers/Grid';

chai.config.truncateThreshold = 0;

describe('grid reducers', () => {
	const initState = {
		players: [],
		currentPlayer: null,
		gameMaster: null,
		phase: PHASES.ARRIVED,
		room: null,
	};

	const mockPlayer = {
		name: 'derp',
		grid: initGrid(),
		score: 0,
		phase: 'arrived',
		isMaster: false,
	};

	it('should return the initial state', () => {
		const altered = {
			players: [],
			currentPlayer: 'coucou',
			gameMaster: 'coucou',
			pieceQueue: [],
			phase: PHASES.CONNECTED,
			room: null,
		};
		expect(reducer(altered, restartGame())).to.eql(initState);
	});

	it('should init player and room', () => {
		expect(reducer(undefined, initPlayerAndRoom('coco', 42))).to.eql({
			...initState,
			currentPlayer: 'coco',
			room: 42,
		});
	});

	it('should update players', () => {
		const mockPlayers = [{ ...mockPlayer }, { ...mockPlayer, name: 'deerp', isMaster: true }];
		expect(reducer(undefined, updatePlayers(mockPlayers))).to.eql({
			...initState,
			players : mockPlayers,
			gameMaster: mockPlayers[1],
		});
	});

	it('should update phase', () => {
		expect(reducer(undefined, switchPhase(PHASES.ENDED))).to.eql({
			...initState,
			phase: PHASES.ENDED,
		});
	});
});