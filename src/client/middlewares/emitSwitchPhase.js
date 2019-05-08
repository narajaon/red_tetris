export default function emitSwitchPhase() {
	return ({ dispatch, getState }) => next => (action) => {
		const { event, socket, data } = action;

		if (event !== 'switch-phase') return next(action);

		return socket.emit(event, data);
	};
}