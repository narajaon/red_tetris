/**
 * TODO:
 * - Use combineReducers instead
 */
export default function Game(state = {}, action) {
	return {
		pieces: pieces(state.pieces, action),
		players: players(state.players, action),
		gameState: gameState(state.gameState, action), // connected - started - finished
		socket: socket(state.socket, action),
		grid: grid(state.grid, action),
	};
}