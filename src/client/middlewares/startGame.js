import { switchPhase, initPlayerAndRoom } from '../actions/Game';
import { errorAction } from '../actions/errors';
import { startAnimation } from '../actions/Grid';
import { listenToNewPiece, listenToNewPlayers } from '../actions/Socket';
import { PHASES } from '../constants';

export default function startGame() {
	return ({ dispatch, getState }) => next => (action) => {
		const { gameReducer } = getState();
		const { currentPlayer, room, phase } = gameReducer;
		const { hash } = location;

		if (phase !== PHASES.CONNECTED) return next(action);

		// Switch phase
		next(switchPhase(PHASES.STARTED));

		// Parse hash
		const groups = /^#(.+)\[(.+)\]$/.exec(hash);

		if (!groups) {
			return next(errorAction('bad hash'));
		}

		const newRoom = Number.parseInt(groups[1]);
		const newPlayer = groups[2];
		const roomIsValid = !(/\D/.test(groups[1])) && (newRoom < 10);
		const nameIsValid = !(/\W/.test(newPlayer))  && (newPlayer.length < 12);

		if (!roomIsValid || !nameIsValid) {
			return next(errorAction('bad hash'));
		}

		// Emit player connected
		if (currentPlayer !== newPlayer && room !== newRoom) {
			next(initPlayerAndRoom(newPlayer, newRoom));
			next({ emit: true, event: 'new-player-connected-event' } );
		}

		//  Listen to events
		dispatch(listenToNewPiece());
		dispatch(listenToNewPlayers());

		// Start animation
		return dispatch(startAnimation());
	};
}