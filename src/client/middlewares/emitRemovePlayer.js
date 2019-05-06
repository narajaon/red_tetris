export default function emitRemovePlayer() {
	return ({ dispatch, getState }) => next => (action) => {
		const { event, socket } = action;

		if (event !== 'remove-player') return next(action);

		const { gameReducer } = getState();
		const { currentPlayer, room } = gameReducer;

		return socket.emit(event, { player: currentPlayer, room });
	};
}