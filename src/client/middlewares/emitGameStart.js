export default function emitGameStart() {
	return ({ dispatch, getState }) => next => (action) => {
		const { event, socket } = action;

		if (event !== 'start-game') return next(action);
		const { gameReducer } = getState();
		const { currentPlayer, room } = gameReducer;

		return socket.emit(event, { room, player: currentPlayer });
	};
}