import { startAnimation } from '../actions/Grid';
import { emitPieceRequest } from '../actions/Socket';

export default function hijackTranslate() {
	return ({ dispatch, getState }) => next => (action) => {
		const { type } = action;
		const { pieces } = getState().gridReducer;

		if (type === 'translate-piece' && pieces === null) {
			dispatch(emitPieceRequest());

			return dispatch(startAnimation());
		}

		return next(action);
	};
}