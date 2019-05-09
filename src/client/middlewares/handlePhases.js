import { PHASES } from '../constants';
import { emitRemovePlayer } from '../actions/Socket';
import { resetGrid, startAnimation } from '../actions/Grid';
import { restartGame } from '../actions/Game';

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
				dispatch(restartGame());
				dispatch(resetGrid());
				clearInterval(interval);
			}
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