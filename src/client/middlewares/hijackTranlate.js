import { emitPieceRequest } from '../actions/Socket';

export default function hijackTranslate() {
	return ({ dispatch, getState }) => next => (action) => {
		const { type } = action;
		
		if (type === 'translate-piece' &&
			getState().gridReducer.pieces === null) {
			return dispatch(emitPieceRequest('narajaon', 42));
		}

		return next(action);
	};
}