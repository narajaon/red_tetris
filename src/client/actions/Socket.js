import { startAnimation, queuePieces } from './Grid';
import { switchPhase, updatePlayers } from './Game';
import { PHASES } from '../constants';

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

export function emitPhaseSwitch(player, room, phase) {
	return {
		event: 'switch-phase',
		emit: true,
		data: {
			player,
			room,
			phase,
		},
	};
}

export function emitRemovePlayer() {
	return {
		event: 'remove-player',
		emit: true,
	};
}

export function emitGridUpdate(player, grid, room) {
	return {
		event: 'update-grid',
		emit: true,
		data: {
			player,
			grid,
			room,
		},
	};
}

export function listenToPhaseSwitch() {
	return dispatch => dispatch({
		event: 'phase-switch-event',
		handle: ({ phase }) => {
			dispatch(switchPhase(phase));
			if (phase === PHASES.STARTED) {
				dispatch(startAnimation());
			}
		},
	});
}

export function listenToNewPiece() {
	return dispatch => dispatch({
		event: 'new-piece-event',
		handle: ({ pieces }) => {
			dispatch(queuePieces(pieces));
		},
	});
}

export function listenPlayersUpdate() {
	return dispatch => dispatch({
		event: 'update-players',
		handle: ({ players }) => {
			dispatch(updatePlayers(players));
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