import { placePiece } from './Grid';
import { switchPhase } from './Game';

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

export function emitAuthRequest(player, room) {
	return {
		event: 'auth-request',
		emit: true,
		data: {
			player,
			room,
		}
	};
}

export function listenToPhaseSwitch() {
	return dispatch => dispatch({
		event: 'phase-switch-event',
		handle: ({ phase }) => {
			dispatch(switchPhase(phase));
		},
	});
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

export const listened = [
	'new-player-connected-event',	
	'new-piece-event'
];

export const emitted = [
	'new-player-connected-event',
	'piece-request',
];