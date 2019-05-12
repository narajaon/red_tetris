import { queuePieces, resetGridScoreLine, insertLines } from './Grid';
import { switchPhase, updatePlayers } from './Game';

export function emitPieceRequest(grid) {
	return {
		event: 'piece-request',
		emit: true,
		data: {
			grid,
		}
	};
}

export function emitAuthRequest() {
	return {
		event: 'auth-request',
		emit: true,
	};
}

export function emitGameStart() {
	return {
		event: 'start-game',
		emit: true,
	};
}

export function emitPhaseSwitch(phase) {
	return {
		event: 'switch-phase',
		emit: true,
		data: {
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

export function emitGridUpdate(grid, score) {
	return dispatch => {
		dispatch({
			event: 'update-grid',
			emit: true,
			data: {
				grid,
				score
			},
		});

		return dispatch(resetGridScoreLine());
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
			dispatch(queuePieces(pieces));
		},
	});
}

export function listenToAddBlocks() {
	return dispatch => dispatch({
		event: 'add-lines',
		handle: ({ lines }) => {
			dispatch(insertLines(lines));
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
	'phase-switch-event',
	'new-piece-event',
	'update-players',
	'add-lines',
];

export const emitted = [
	'new-player-connected-event',
	'piece-request',
];