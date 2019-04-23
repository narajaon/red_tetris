export function switchPhase(phase) {
	return { type: 'switch-phase', phase };
}

export function initPlayerAndRoom(player, room) {
	return { type: 'init-player-and-room', player, room };
}

export function setHash(hash) {
	return { type: 'set-hash', hash };
}