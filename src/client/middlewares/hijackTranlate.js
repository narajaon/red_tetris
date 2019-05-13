import { popPieces, placePiece, setScore } from '../actions/Grid';
import { emitPieceRequest, emitGridUpdate } from '../actions/Socket';

export default function hijackTranslate() {
	return ({ dispatch, getState }) => next => (action) => {
		const { type } = action;
		const { pieces, piecesQueue, grid, score } = getState().gridReducer;

		if (type === 'translate-piece' && pieces === null) {
			if (piecesQueue.length > 0) {
				dispatch(popPieces());
				dispatch(placePiece());
				
				// ADD PLACE-BLOCKED-PIECES HERE
				// dispatch(placeGarbage(score.garbage));
				dispatch(setScore({ propName: 'garbage', prop: 0 }));
			} else {
				dispatch(emitPieceRequest(grid));
			}

			return dispatch(emitGridUpdate(grid, score));
		}

		return next(action);
	};
}