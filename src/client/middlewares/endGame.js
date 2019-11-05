import { resetGrid } from '../actions/Grid';
import { PHASES } from '../constants';
import { emitPhaseSwitch } from '../actions/Socket';

export default function endGame() {
	return ({ dispatch, getState }) => next => action => {
		const { gridReducer } = getState();
		const { interval, overflows } = gridReducer;
		const { type } = action;

		if (overflows && type !== 'reset-grid') {
			clearInterval(interval);
			dispatch(resetGrid());

			return dispatch(emitPhaseSwitch(PHASES.ENDED));
		}

		return next(action);
	};
}