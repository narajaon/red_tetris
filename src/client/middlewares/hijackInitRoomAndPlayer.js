import { initPlayerAndRoom } from '../actions/Game';
import { errorAction } from '../actions/errors';
// import { emitPlayerConnected } from '../actions/Socket';

export default function hijackInitRoomAndPlayer() {
	return ({ dispatch, getState }) => next => (action) => {
		const { hash } = location;
		const { gameReducer } = getState();
		const { currentPlayer, room } = gameReducer;
		const { type } = action;
		const groups = /^#(.+)\[(.+)\]$/.exec(hash);

		if (!hash === '') return next(action);

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

		if (currentPlayer === newPlayer && room === newRoom) {
			return next(action);
		}

		next(initPlayerAndRoom(newPlayer, newRoom));

		return next({ emit: true, event: 'new-player-connected-event' } );
	};
}