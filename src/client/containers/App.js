import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from '../components/App';
import {
	listenToNewPiece,
	listenToNewPlayers,
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
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
