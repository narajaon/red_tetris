import { PHASES } from '../constants';
import { emitRemovePlayer } from './Socket';
import { resetGrid, startAnimation } from './Grid';

// export function switchPhase(phase) {
// 	return { type: 'switch-phase', phase };
// }

export function initPlayerAndRoom(player, room) {
	return { type: 'init-player-and-room', player, room };
}

export function updatePlayers(players) {
	return { type: 'update-players', players };
}

export function restartGame() {
	return { type: 'restart-game' };
}

export function switchPhase(phase) {
	return (dispatch, getState) => {
		console.log('SWITCH', phase);
		const { gridReducer, gameReducer } = getState();
		const { currentPlayer } = gameReducer;
		const { interval } = gridReducer;

		switch (phase) {
		case PHASES.ARRIVED:
			if (currentPlayer) {
				dispatch(emitRemovePlayer());
				dispatch(restartGame());
				dispatch(resetGrid());
				
				clearInterval(interval);
			}
			break;
		case PHASES.STARTED:
			dispatch(startAnimation());
			break;
		case PHASES.ENDED:	
			console.log('ENDED');
			break;
		default: // CONNECTED
			break;
		}

		return dispatch({ type: 'switch-phase', phase });
	};
}