export function emitPlayerConnected(player, room) {
	return {
		event: 'player-connected',
		data: {
			player,
			room,
		}
	};
}

export function emitPieceRequest(player, room) {
	return {
		event: 'piece-request',
		data: {
			player,
			room,
		}
	};
}

export function listenToNewPiece() {
	return dispatch => dispatch({
		event: 'new-piece-event',
		handle: ({ pieces }) => {
			dispatch({ type: 'place-piece', pieces });
			dispatch({ type: 'start-animation' });
		},
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