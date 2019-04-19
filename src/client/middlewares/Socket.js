import io from 'socket.io-client';

export default function socketMiddleware() {
	const socket = io();

	return ({ dispatch }) => next => (action) => {
		if (typeof action === 'function') {
			return next(action);
		}

		const {
			event,
			leave,
			handle,
			data,
			...rest
		} = action;

		if (!event) {
			return next(action);
		}

		if (data) {
			return socket.broadcast(event, data);
		}

		if (leave) {
			socket.removeListener(event);
		}

		let handleEvent = handle;
		if (typeof handleEvent === 'string') {
			handleEvent = result => dispatch({ type: handle, result, ...rest });
		}
		
		return socket.on(event, handleEvent);
	};
}