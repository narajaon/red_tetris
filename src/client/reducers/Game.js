import { PHASES } from '../constants';

const initState = {
	players: [],
	currentPlayer: null,
	pieceQueue: [],
	phase: PHASES.CONNECTED, // connected / started / ended
	room: null,
};

const actions = {
	'init-player-and-room': (state, { player, room }) => {
		return {
			...state,
			currentPlayer: player,
			room,
		};
	},
	'new-message': (state, { message }) => {
		console.log(message);
		return state;
	},
	'add-player' : (state, { player }) => {},
	'add-piece-to-queue' : (state, { piece }) => {},
	'switch-phase': (state, { phase }) => {
		return { ...state, phase };
	},
};

const gameReducer = (state = initState, action) => {
	return actions[action.type] ? actions[action.type](state, action) : state;
};

export default gameReducer;