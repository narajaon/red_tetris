export function switchPhase(phase) {
	return { type: 'switch-phase', phase };
}

export function initRoomAndPlayer(player, room) {
	return { type: 'init-player-and-room', player, room };
}