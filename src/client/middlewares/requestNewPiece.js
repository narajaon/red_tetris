export default function requestNewPiece() {
	return ({ dispatch, getState }) => next => (action) => {
		const { event, socket } = action;

		if (event !== 'piece-request') return next(action);
		const { gameReducer } = getState();
		const { currentPlayer , room } = gameReducer;

		return socket.emit(event, { player: currentPlayer, room });
	};
}