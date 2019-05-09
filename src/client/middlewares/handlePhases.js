import { PHASES } from '../constants';
import { emitRemovePlayer } from '../actions/Socket';
import { resetGrid, startAnimation } from '../actions/Grid';

export default function handlePhases() {
	return ({ dispatch, getState }) => next => (action) => {
		const { type, phase } = action;

		if (type !== 'switch-phase') return next(action);
		console.log('SWITCH', phase);

		const { gridReducer, gameReducer } = getState();
		const { currentPlayer } = gameReducer;
		const { interval } = gridReducer;

		switch (phase) {
		case PHASES.ARRIVED:
			if (currentPlayer) {
				dispatch(emitRemovePlayer());
				dispatch(resetGrid());
				clearInterval(interval);
			}
			// dispatch({ event: 'socket-connect', connect: true });
			break;
		case PHASES.STARTED:
			dispatch(startAnimation());
			break;
		case PHASES.ENDED:	
			console.log('ENDED');
			break;
		default: // CONNECTED
			break;
		}

		return next(action);
	};
}