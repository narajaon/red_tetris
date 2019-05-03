import io from 'socket.io-client';
import { serverURI } from '../constants';

export default function handleSocket() {
	const socket = process.env.NODE_ENV === 'development' ?
		io.connect(serverURI) : io();
	console.log(socket.sendBuffer);
	console.log(socket.receiveBuffer);
	
	return ({ dispatch }) => next => (action) => {
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
			socket.removeAllListeners();
			// emit the disconnect event to let the serve know
			
			return socket.close();
		}
		
		return socket.on(event, handle);
	};
}