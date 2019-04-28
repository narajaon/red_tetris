const TETRIS = [
	[
		[1, 1],
		[1, 1],
	],
	[
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 0, 1],
	],
	[
		[0, 0, 1],
		[0, 1, 1],
		[0, 1, 0],
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 1],
	],
	[
		[0, 1, 1],
		[0, 1, 0],
		[0, 1, 0],
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 1, 0],
	],
];

const GAME_PHASES = {
	ARRIVED: 'arrived',
	CONNECTED: 'connected',
	STARTED: 'started',
	ENDED: 'ended',
};

module.exports = {
	TETRIS,
	GAME_PHASES,
};