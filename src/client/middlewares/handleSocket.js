import io from 'socket.io-client';
import { serverURI } from '../constants';
import { listened } from '../actions/Socket';

export default function handleSocket() {
	const socket = process.env.NODE_ENV === 'development' ?
		io.connect(serverURI) : io();

	return () => next => (action) => {
		if (typeof action === 'function') {
			return next(action);
		}

		const {
			event,
			leave,
			handle,
			emit,
			data,
		} = action;

		if (!event) {
			return next(action);
		}

		if (emit) {
			return next({ event, socket, data });
		}

		if (leave) {
			// console.log('LISTENERS', socket.listeners('new-piece-event'));
			listened.forEach(e => {
				socket.removeAllListeners(e);
			});
			
			return socket.disconnect();
		}

		return socket.on(event, handle);
	};
}