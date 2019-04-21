import { connect } from 'react-redux';
import Grid from '../components/Grid';
import { KEYS, PHASES } from '../constants';
import {
	rotatePiece,
	translatePiece,
	startAnimation,
} from '../actions/Grid';

const mapStateToProps = ({ gridReducer, gameReducer }) => {
	const { grid } = gridReducer;
	const { phase } = gameReducer;

	return {
		grid,
		phase,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		keyPressHandler: (event, phase) => {
			switch (event.keyCode) {
			case KEYS.R:
				dispatch(rotatePiece());
				break;
			case KEYS.SPACE:
				if (phase === PHASES.CONNECTED) {
					dispatch(startAnimation());
				}
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
