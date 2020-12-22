import {PHASES, TETRIS} from '../../client/constants';
import { initGrid } from '../../client/helpers/Grid';

export const pieces = {
	origin: { x: 4, y: 0 },
	current: TETRIS[1],
};

export const fullGrid = [
	[0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
	[0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
	[0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
	[0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
	[0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
	[0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
	[0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
	[0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
	[0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
	[0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
	[0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
	[0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
	[0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
	[0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
	[0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
	[0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
	[0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
	[0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
	[0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
	[0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
];

export const player = {
	name: 'mockPlayer',
	score: {
		lines: 0,
		total: 0,
		garbage: 0,
	},
	phase: 'arrived',
	isMaster: false,
	grid: initGrid(),
};

export const playerList = [ 
	player,
	{...player, name: 'mockPlayer2',  score: {
		lines: 0,
		total: 0,
		garbage: 0,
	}
	},
	{...player, name: 'mockPlayer4',  score: {
		lines: 1,
		total: 10,
		garbage: 0,
	}
	, isMaster: true},
	{...player, name: 'mockPlayer3',  score: {
		lines: 10,
		total: 100,
		garbage: 0,
	}
	},
];

export const fullStore = {
	gameReducer: {
		players: playerList,
		currentPlayer: player.name,
		gameMaster: playerList[1],
		phase: PHASES.STARTED,
		room: '42',
	},
	gridReducer: {
		grid: initGrid(),
		pieces: TETRIS[1],
		interval: null,
		overflows: false,
		piecesQueue: [TETRIS[1], TETRIS[2], TETRIS[0]],
		score: player.score
	}
};
