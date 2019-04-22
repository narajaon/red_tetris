import { connect } from 'react-redux';
import Grid from '../components/Grid';
import { KEYS } from '../constants';
import {
	rotatePiece,
	translatePiece,
	startAnimation,
} from '../actions/Grid';

const mapStateToProps = ({ gridReducer }) => {
	const { grid } = gridReducer;

	return {
		grid,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		keyPressHandler: (event) => {
			switch (event.keyCode) {
			case KEYS.R:
				dispatch(rotatePiece());
				break;
			case KEYS.SPACE:
				dispatch(startAnimation());
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
