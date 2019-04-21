export function errorAction(message) { // eslint-disable-line
	return {
		type: 'error',
		message,
	};
}