import { PHASES } from '../constants';
import { emitPhaseSwitch } from '../actions/Socket';

/**
 * TODO :
 * - redirect to error page
 */

export default function handleErrors() {
	return ({ dispatch, getState }) => next => (action) => {
		const { type, message } = action;

		if (type !== 'error') return next(action);

		dispatch(emitPhaseSwitch(PHASES.ARRIVED));

		return console.warn('ERROR:', message);
	};
}