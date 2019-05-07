export default function emitSwitchPhase() {
	return ({ dispatch, getState }) => next => (action) => {
		const { event, socket } = action;

		if (event !== 'switch-phase') return next(action);
		const { gameReducer } = getState();
		const { currentPlayer, room } = gameReducer;

		return socket.emit(event, { room, player: currentPlayer });
	};
}