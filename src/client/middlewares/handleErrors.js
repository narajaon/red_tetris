import { switchPhase } from '../actions/Game';
import { PHASES } from '../constants';


/**
 * TODO :
 * - redirect to error page
 */

export default function handleErrors() {
	return ({ dispatch, getState }) => next => (action) => {
		const { type, message } = action;
		const { gameReducer } = getState();
		const { history } = gameReducer;

		if (type !== 'error') return next(action);

		next((switchPhase(PHASES.ARRIVED)));

		return console.warn('ERROR:', message);
	};
}