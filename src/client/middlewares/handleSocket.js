import io from 'socket.io-client';
import { serverURI } from '../constants';

export default function handleSocket() {
	const socket = process.env.NODE_ENV === 'development' ?
		io.connect(serverURI) : io();

	return ({ dispatch }) => next => (action) => {
		if (typeof action === 'function') {
			return next(action);
		}

		const {
			event,
			leave,
			handle,
			emit,
		} = action;

		if (!event) {
			return next(action);
		}

		if (emit) {
			return next({ event, socket });
		}

		if (leave) {
			return socket.removeAllListeners();
		}

		let handleEvent = handle;

		if (typeof handleEvent === 'string') {
			handleEvent = result => {	
				dispatch({
					type: handle,
					data: { ...result }
				});
			};
		}

		return socket.on(event, handleEvent);
	};
}