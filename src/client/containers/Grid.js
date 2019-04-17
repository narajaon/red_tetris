import { connect } from 'react-redux';
import Grid from '../components/Grid';
import {
	placePiece,
	rotatePiece,
	translatePiece,
	startAnimation,
} from '../actions';

const mapStateToProps = ({ gridReducer }) => {
	const { grid, pieces, interval } = gridReducer;

	return {
		grid,
		pieces,
		interval,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		placePiece: () => {
			dispatch(placePiece());
		},
		rotatePiece: piece => {
			dispatch(rotatePiece(piece));
		},
		translatePiece: (translation) => {
			dispatch(translatePiece(translation));
		},
		startAnimation: (interval) => {
			dispatch(startAnimation(interval));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
