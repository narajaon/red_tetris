import { startAnimation } from '../actions/Grid';

export default function hijackTranslate() {
	return ({ dispatch, getState }) => next => (action) => {
		const { type } = action;
		const { pieces } = getState().gridReducer;
		
		if (type === 'translate-piece' &&
			pieces === null) {
			return dispatch(startAnimation());
		}

		return next(action);
	};
}