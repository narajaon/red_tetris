import { popPieces, placePiece, setScore, placeGarbage } from '../actions/Grid';
import { emitPieceRequest, emitGridUpdate } from '../actions/Socket';

export default function hijackTranslate() {
	return ({ dispatch, getState }) => next => (action) => {
		const { type } = action;
		const { pieces, piecesQueue, grid, score } = getState().gridReducer;
		
		// console.log('GARBAGE', score.garbage, type);
		if (type === 'translate-piece' && pieces === null) {
			if (piecesQueue.length > 0) {
				dispatch(popPieces());
				dispatch(placePiece());
				
				// ADD PLACE-BLOCKED-PIECES HERE
				if (score.garbage > 0) {
					dispatch(placeGarbage(score.garbage));
				}
			} else {
				dispatch(emitPieceRequest(grid));
			}

			return dispatch(emitGridUpdate(grid, score));
		}

		return next(action);
	};
}