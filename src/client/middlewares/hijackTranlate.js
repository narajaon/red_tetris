import { popPieces, placePiece } from '../actions/Grid';
import { emitPieceRequest, emitGridUpdate } from '../actions/Socket';

export default function hijackTranslate() {
	return ({ dispatch, getState }) => next => (action) => {
		const { type } = action;
		const { pieces, piecesQueue, grid } = getState().gridReducer;

		if (type === 'translate-piece' && pieces === null) {
			if (piecesQueue.length > 0) {
				dispatch(popPieces());
				dispatch(placePiece());
			} else {
				console.log('EMIT');
				dispatch(emitPieceRequest(grid));
			}

			dispatch(emitGridUpdate(grid));

			return null;
		}

		return next(action);
	};
}