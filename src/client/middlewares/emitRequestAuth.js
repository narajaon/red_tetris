export default function requestAuth() {
	return ({ dispatch, getState }) => next => (action) => {
		const { event, socket, data } = action;

		if (event !== 'auth-request') return next(action);

		return socket.emit(event, data);
	};
}