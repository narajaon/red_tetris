import { PHASES } from '../constants';

const initState = {
	players: [],
	currentPlayer: null,
	gameMaster: null,
	pieceQueue: [],
	phase: PHASES.ARRIVED,
	room: null,
};

const actions = {
	'restart-game': () => {
		return initState;
	},
	'init-player-and-room': (state, { player, room }) => {
		return {
			...state,
			currentPlayer: player,
			room,
		};
	},
	'update-players' : (state, { players }) => {
		return {
			...state,
			players: [ ...players ],
			gameMaster: players.find(({ isMaster }) => isMaster),
		};
	},
	'add-piece-to-queue' : (state, { piece }) => {
		return {
			...state,
			pieceQueue: [ ...state.pieceQueue, piece ],
		};
	},
	'switch-phase': (state, { phase }) => {
		return { ...state, phase };
	},
};

const gameReducer = (state = initState, action) => {
	return actions[action.type] ? actions[action.type](state, action) : state;
};

export default gameReducer;