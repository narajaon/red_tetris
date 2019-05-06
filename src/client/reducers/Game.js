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
	'init-player-and-room': (state, { player, room }) => {
		return {
			...state,
			currentPlayer: player,
			room,
		};
	},
	'update-players' : (state, { players }) => {
		const gm = players.find(({ isMaster }) => isMaster);
		
		return {
			...state,
			players: [ ...players ],
			gameMaster: gm,
		};
	},
	'add-piece-to-queue' : (state, { piece }) => {
		const { pieceQueue } = state;

		return {
			...state,
			pieceQueue: [ ...pieceQueue, piece ],
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