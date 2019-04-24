import { placePiece } from './Grid';

export function emitPlayerConnected(socket) {
	return {
		event: 'new-player-connected-event',
		emit: true,
		data: socket,
	};
}

export function emitPieceRequest(player, room) {
	return {
		event: 'piece-request',
		emit: true,
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
			dispatch(placePiece(pieces));
		},
	});
}

export function listenToNewPlayers() {
	return dispatch => dispatch({
		event: 'new-player-connected-event',
		handle: ({ player, room }) => dispatch({
			type: 'new-player-connected',
			data: {
				player,
				room,
			}
		}),
	});
}

export function listenToGlobalMessages() {
	return dispatch => dispatch({
		event: 'broadcast',
		handle: (message) => {
			dispatch({
				type: 'new-message',
				message,
			});
		},
	});
}