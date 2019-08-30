export const WALLKICKS = [
	{ x: 1, y: 0 },
	{ x: -1, y: 0 },
	{ x: 0, y: -1 },
];

export const WALLKICKS_I = [
	{ x: 2, y: 0 },
	{ x: -2, y: 0 },
	{ x: 0, y: -2 },
];

export const TILE = {
	EMPTY: 0,
	CURRENT: 1,
	FULL: 2,
	BLOCKED: 3,
	SHADOW: 4,
};

export const KEYS = {
	R: 82,
	SPACE: 32,
	LEFT: 37,
	RIGHT: 39,
	DOWN: 40,
	ENTER: 13,
};

export const PHASES = {
	ARRIVED: 'arrived',
	CONNECTED: 'connected',
	STARTED: 'started',
	ENDED: 'ended',
};

export const TETRIS = [
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

export const serverURI = 'http://localhost:8080/';

export const DEBOUNCE_VAL = 100;

export const GRAVITY_VAL = 500;