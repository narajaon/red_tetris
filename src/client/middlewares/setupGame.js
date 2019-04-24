import { switchPhase, initPlayerAndRoom } from '../actions/Game';
import { errorAction } from '../actions/errors';
import { listenToNewPiece, listenToNewPlayers, listenToGlobalMessages } from '../actions/Socket';
import { PHASES } from '../constants';

export default function setupGame() {
	return ({ dispatch, getState }) => next => (action) => {
		const { gameReducer } = getState();
		const { currentPlayer, room, phase } = gameReducer;
		const { hash } = location;
		const { type } = action;

		if (type !== 'setup-game' && phase !== PHASES.CONNECTED) return next(action);

		// Switch phase
		next(switchPhase(PHASES.STARTED));

		// Parse hash
		const groups = /^#(.+)\[(.+)\]$/.exec(hash);

		if (hash !== '' && !groups) {
			return next(errorAction('bad hash'));
		}

		let newRoom;
		let newPlayer;
		if (!groups ||
			!groups[1] ||
			!groups[2] ||
			hash === '') {
			newRoom = 0;
			newPlayer = 'unknownPlayer';
		} else {
			newRoom = Number.parseInt(groups[1]);
			newPlayer = groups[2];
		}

		const roomIsValid = !(/\D/.test(groups ? groups[1] : '0')) && (newRoom < 10);
		const nameIsValid = !(/\W/.test(newPlayer))  && (newPlayer.length < 15);

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
		dispatch(listenToGlobalMessages());
		
		return next(action);
	};
}