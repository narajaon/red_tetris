export default function emitRemovePlayer() {
	return ({ dispatch, getState }) => next => (action) => {
		const { event, socket } = action;

		if (event !== 'remove-player') return next(action);
		const { gameReducer } = getState();
		const { player, room } = gameReducer;

		// console.log('LISTENERS', socket.listeners('new-piece-event'));
		
		return socket.emit(event, { player, room });
	};
}