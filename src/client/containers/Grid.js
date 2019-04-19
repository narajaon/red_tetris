import { connect } from 'react-redux';
import Grid from '../components/Grid';
import { KEYS } from '../constants';
import {
	placePiece,
	rotatePiece,
	translatePiece,
	startAnimation,
} from '../actions/Grid';

const mapStateToProps = ({ gridReducer }) => {
	const { grid, pieces, interval, overflows } = gridReducer;

	return {
		grid,
		pieces,
		interval,
		overflows,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		keyPressHandler: (event, pieces) => {
			switch (event.keyCode) {
			case KEYS.R:
				dispatch(rotatePiece(pieces));
				break;
			case KEYS.SPACE:
				dispatch(placePiece());
				break;
			case KEYS.LEFT:
				dispatch(translatePiece({x: -1, y: 0}));
				break;
			case KEYS.RIGHT:
				dispatch(translatePiece({x: 1, y: 0}));
				break;
			case KEYS.DOWN:
				dispatch(translatePiece({x: 0, y: 1}));
				break;
			}
		},
		startAnimation: () => {
			dispatch(placePiece());
			dispatch(startAnimation(setInterval(() => {
				dispatch(translatePiece({x: 0, y: 1}));
			}, 500)));
		},
		stopAnimation: (interval) => {
			clearInterval(interval);
			dispatch(startAnimation(null));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
