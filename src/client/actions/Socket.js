import { placePiece, startAnimation, translatePiece } from './Grid';
import { switchPhase, updatePlayers } from './Game';

export function emitPieceRequest(player, room, grid) {
	return {
		event: 'piece-request',
		emit: true,
		data: {
			player,
			room,
			grid,
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

export function emitGameStart(room) {
	return {
		event: 'start-game',
		emit: true,
		data: { room },
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
		handle: ({ pieces, players }) => {
			dispatch(placePiece(pieces));
			// dispatch(translatePiece({ x: 0, y: 1 }));
			dispatch(startAnimation());
			// TODO : dispatch(addPieceToQueue)
			dispatch(updatePlayers(players));
		},
	});
}

export function listenToNewPlayers() {
	return dispatch => dispatch({
		event: 'new-player-connected-event',
		handle: ({ players }) => dispatch(updatePlayers(players)),
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