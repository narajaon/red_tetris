import io from 'socket.io-client';
import { serverURI } from '../constants';
import { listened } from '../actions/Socket';

export default function handleSocket() {
	const socket = process.env.NODE_ENV === 'development' ?
		io.connect(serverURI) : io();

	return ({ getState }) => next => (action) => {
		if (typeof action === 'function') {
			return next(action);
		}
		const {
			event,
			leave,
			handle,
			emit,
			connect,
			data,
		} = action;

		if (!event) {
			return next(action);
		}

		if (emit) {
			const { gameReducer } = getState();
			const { currentPlayer, room } = gameReducer;
	
			return socket.emit(event, { ...data, player: currentPlayer, room });
		}

		if (connect) {
			return socket.connect();
		}

		if (leave) {
			return socket.removeEventListener(event);
		}

		return socket.on(event, handle);
	};
}