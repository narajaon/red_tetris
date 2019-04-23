import io from 'socket.io-client';

export default function handleSocket() {
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
			emit,
		} = action;

		if (!event) {
			return next(action);
		}

		if (emit) {
			return next({ event, socket });
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

		console.log(event);
		

		return socket.on(event, handleEvent);
	};
}