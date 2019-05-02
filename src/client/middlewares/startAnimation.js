import { translatePiece } from '../actions/Grid';
import { emitPieceRequest } from '../actions/Socket';

export default function startAnimation() {
	return ({ dispatch, getState }) => next => (action) => {
		const { type } = action;

		if (type === 'start-animation') {
			if (getState().gridReducer.interval !== null) {
				clearInterval(getState().gridReducer.interval);
			}

			const { gridReducer, gameReducer } = getState();
			const { player, room } = gameReducer;
			const { grid } = gridReducer;

			const interval = () => {
				return setInterval(() => {
					dispatch(translatePiece({x: 0, y: 1}));
				}, 500);
			};
			dispatch(emitPieceRequest(player, room, grid));

			return next({ type, interval: interval() });
		}

		return next(action);
	};
}