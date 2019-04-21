import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from '../components/App';
import {
	listenToNewPiece,
	// listenToOtherPlayers,
	listenToNewPlayers,
	emitPlayerConnected,
} from '../actions/Socket';

const mapStateToProps = () => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		listenToSocketEvents: () => {
			dispatch(listenToNewPiece());
			dispatch(listenToNewPlayers());
		},
		initGame: (hash) => {
			dispatch({ type: 'parse-hash', hash });
			dispatch(emitPlayerConnected());
		}
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
