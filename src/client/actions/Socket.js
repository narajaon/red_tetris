export function emitPlayerConnected(player, room) {
	return {
		event: 'player-connected',
		data: {
			player,
			room,
		}
	};
}

export function emitPiecePlaced(player, room) {
	return {
		event: 'piece-placed',
		data: {
			player,
			room,
		}
	};
}

export function handleNewPiece() {
	return dispatch => dispatch({
		event: 'new-piece-event',
		handle: data => dispatch({
			type: 'new-piece',
			piece: data.piece,
		}),
	});
}

/**
 * TODO :
 * - create new-piece
 * - create piece-placed
 * - create player-connected
 */