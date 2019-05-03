export default function emitGridUpdate() {
	return ({ dispatch, getState }) => next => (action) => {
		const { event, socket } = action;

		if (event !== 'update-grid') return next(action);
		const { gameReducer, gridReducer } = getState();
		const { currentPlayer , room } = gameReducer;
		const { grid } = gridReducer;

		return socket.emit(event, { player: currentPlayer, room, grid });
	};
}