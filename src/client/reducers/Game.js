import { PHASES } from '../constants';

const initState = {
	players: [],
	currentPlayer: '',
	pieceQueue: [],
	phase: PHASES.CONNECTED, // connected / started / ended
	room: 42,
};

const actions = {
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