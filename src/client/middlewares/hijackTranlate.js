import { emitPieceRequest } from '../actions/Socket';

export default function hijackTranslate() {
	return ({ dispatch, getState }) => next => (action) => {
		const { type } = action;
		const { pieces } = getState().gridReducer;
		const { currentPlayer, room } = getState().gameReducer;
		
		if (type === 'translate-piece' &&
			pieces === null) {
			return dispatch(emitPieceRequest(currentPlayer, room));
		}

		return next(action);
	};
}