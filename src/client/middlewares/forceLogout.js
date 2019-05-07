import { errorAction } from '../actions/errors';
import { PHASES } from '../constants';

/**
 * TODO :
 * - redirect to error page
 */

export default function forceLogout() {
	return ({ getState }) => next => (action) => {
		const { gameReducer } = getState();
		const { phase } = gameReducer;
		const { type } = action;

		if (phase === PHASES.ARRIVED && type !== 'switch-phase') {
			return next(errorAction('Non authorized - force logout'));
		}

		return next(action);
	};
}