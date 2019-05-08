import { translatePiece } from '../actions/Grid';

export default function startAnimation() {
	return ({ dispatch, getState }) => next => (action) => {
		const { type } = action;

		if (type === 'start-animation') {
			const { gridReducer } = getState();
			const { interval } = gridReducer;
			if (interval !== null) {
				clearInterval(interval);
			}

			const newInterval = () => {
				return setInterval(() => {
					dispatch(translatePiece({x: 0, y: 1}));
				}, 500);
			};

			return next({ type, interval: newInterval() });
		}

		return next(action);
	};
}