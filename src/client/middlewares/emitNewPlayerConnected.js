export default function newPlayerConnected() {
	return ({ getState }) => next => action => {
		const { event, socket } = action;

		if (event !== 'new-player-connected-event') return next(action);
		const { gameReducer } = getState();
		const { currentPlayer, room } = gameReducer;

		return socket.emit(event, { player: currentPlayer, room });
	};
}