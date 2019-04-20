import io from 'socket.io-client';

export default function socketMiddleware() {
	const socket = process.env.NODE_ENV === 'development' ?
		io.connect('http://localhost:8080/') : io();

	return ({ dispatch }) => next => (action) => {
		if (typeof action === 'function') {
			return next(action);
		}

		const {
			event,
			leave,
			handle,
			data,
		} = action;

		if (!event) {
			return next(action);
		}

		if (data) {
			console.log(data);
			return socket.emit(event, data);
		}

		if (leave) {
			socket.removeListener(event);
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