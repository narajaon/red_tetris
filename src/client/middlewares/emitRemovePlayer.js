export default function emitRemovePlayer() {
	return ({ dispatch, getState }) => next => (action) => {
		const { event, socket } = action;

		if (event !== 'remove-player') return next(action);
		debugger;
		const { gameReducer } = getState();
		const { player, room } = gameReducer;

		return socket.emit(event, { player, room });
	};
}