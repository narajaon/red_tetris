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

export function listenToNewPiece() {
	return dispatch => dispatch({
		event: 'new-piece-event',
		handle: ({ piece }) => dispatch({
			type: 'new-piece',
			piece: piece,
		}),
	});
}

export function listenToNewPlayer() {
	return dispatch => dispatch({
		event: 'new-player-connected',
		handle: ({ player }) => dispatch({
			type: 'new-player-connected',
			piece: player,
		}),
	});
}
/**
 * TODO :
 * - create new-piece
 * - create piece-placed
 * - create player-connected
 */