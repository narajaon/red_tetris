import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from '../components/App';
import {
	listenToNewPiece,
	listenToNewPlayer,
} from '../actions/Socket';

const mapStateToProps = ({ gameReducer }) => {
	const { players, currentPlayer, room } = gameReducer;
	
	return {
		players,
		currentPlayer,
		room,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		listenToSocketEvents: () => {
			dispatch(listenToNewPiece());
			dispatch(listenToNewPlayer());
		},
		initGame(hash) {
			dispatch({ type: 'parse-hash', hash });
		}
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
