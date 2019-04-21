import { initRoomAndPlayer } from '../actions/Game';
import { emitPlayerConnected } from '../actions/Socket';
import { errorAction } from '../actions/errors';

export default function parseHash() {
	return ({ dispatch, getState }) => next => (action) => {
		const { type, hash } = action;

		if (type !== 'parse-hash') return next(action);

		const groups = /^#(.+)\[(.+)\]$/.exec(hash);

		if (!groups) {
			return dispatch(errorAction('bad hash'));
		}

		const room = Number.parseInt(groups[1]);
		const player = groups[2];
		const roomIsValid = !(/\D/.test(groups[1])) && (room < 10);
		const nameIsValid = !(/\W/.test(player))  && (player.length < 12);

		if (!roomIsValid || !nameIsValid) {
			return dispatch(errorAction('bad hash'));
		}

		dispatch(initRoomAndPlayer(player, room));

		return dispatch(emitPlayerConnected(player, room));
	};
}