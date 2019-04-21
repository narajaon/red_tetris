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
};

export const KEYS = {
	R: 82,
	SPACE: 32,
	LEFT: 37,
	RIGHT: 39,
	DOWN: 40,
};

export const PHASES = {
	CONNECTED: 'connected',
	STARTED: 'started',
	ENDED: 'ended',
};