import { connect } from 'react-redux';
import App from '../components/App';
import {
	listenToNewPiece,
	listenToNewPlayer,
	emitPlayerConnected,
	emitPieceRequest,
} from '../actions/Socket';

const mapStateToProps = ({ gameReducer }) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		listenToSocketEvents: () => {
			dispatch(emitPlayerConnected('narajaon', 42));
			dispatch(listenToNewPiece());
			dispatch(listenToNewPlayer());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
