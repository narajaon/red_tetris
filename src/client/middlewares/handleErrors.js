/**
 * TODO :
 * - redirect to error page
 */

export default function handleErrors() {
	return ({ dispatch, getState }) => next => (action) => {
		const { type, message } = action;

		if (type !== 'error') return next(action);

		return console.warn('ERROR:', message);
	};
}