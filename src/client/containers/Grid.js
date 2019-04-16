import { connect } from 'react-redux';
import Grid from '../components/Grid';
import {
	placePiece,
	rotatePiece,
	translatePiece,
} from '../actions';

const mapStateToProps = ({ gridReducer }) => {
	const { grid, pieces } = gridReducer;
	
	return {
		grid,
		pieces,
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
