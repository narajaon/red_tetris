import io from 'socket.io-client';
import { serverURI } from '../constants';

export default function handleSocket() {
	const options = {
		'reconnection': true,
		'reconnectionDelay': 500,
		'reconnectionAttempts': 10
	};

	// const socket = process.env.NODE_ENV === 'development' ?
	// io.connect(serverURI, options) : io(options);
	const socket = io.connect(serverURI, options);

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
