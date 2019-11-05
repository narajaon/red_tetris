import { PHASES } from '../constants';
import { emitPhaseSwitch } from '../actions/Socket';

/**
 * TODO :
 * - redirect to error page
 */

export default function handleErrors() {
	return ({ dispatch }) => next => (action) => {
		// const { type, message } = action;
		const { type } = action;

		if (type !== 'error') return next(action);

		return dispatch(emitPhaseSwitch(PHASES.ARRIVED));
	};
}