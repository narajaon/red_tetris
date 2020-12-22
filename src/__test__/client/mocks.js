import {PHASES} from '../../client/constants';

export const player = {
	name: 'mockPlayer',
	score: {
		lines: 0,
		total: 0,
		garbage: 0,
	},
	phase: 'arrived',
	isMaster: false,
};

export const playerList = [ 
	player,
	{...player, name: 'mockPlayer2',  score: {
		lines: 0,
		total: 0,
		garbage: 0,
	}
	},
	{...player, name: 'mockPlayer3',  score: {
		lines: 10,
		total: 100,
		garbage: 0,
	}
	},
	{...player, name: 'mockPlayer4',  score: {
		lines: 1,
		total: 10,
		garbage: 0,
	}
	, isMaster: true},
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
		score: player.score
	}
};
