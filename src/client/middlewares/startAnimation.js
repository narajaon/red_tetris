import { translatePiece } from '../actions/Grid';
import { switchPhase } from '../actions/Game';
import { PHASES } from '../constants';

export default function startAnimation() {
	return ({ dispatch, getState }) => next => (action) => {
		const { type } = action;

		if (type === 'start-animation') {
			if (getState().gridReducer.interval !== null) {
				clearInterval(getState().gridReducer.interval);
			}
			// debugger;

			const interval = () => {
				return setInterval(() => {
					dispatch(translatePiece({x: 0, y: 1}));
				}, 500);
			};

			dispatch(switchPhase(PHASES.STARTED));

			return next({ type, interval: interval() });
		}

		return next(action);
	};
}