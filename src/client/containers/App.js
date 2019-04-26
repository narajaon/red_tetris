import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { listenToNewPiece, listenToNewPlayers, listenToGlobalMessages } from '../actions/Socket';
import { rotatePiece, startAnimation, translatePiece } from '../actions/Grid';
import { KEYS } from '../constants';
import Grid from '../components/Grid';

const mapStateToProps = ({ gridReducer }) => {
	return {
		grid: gridReducer.grid,
		interval: gridReducer.interval,
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
		setupGame: () => {
			dispatch(listenToNewPiece());
			dispatch(listenToNewPlayers());
			dispatch(listenToGlobalMessages());
		},
		disconnectPlayer: (history) => {
			// dispatch(reinitState)
			history.replace({
				pathname: '/login',
				hash: '',
			});
		},
	};
};

const App = ({ grid, keyPressHandler, setupGame, disconnectPlayer, history }) => {
	const style = {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
	};

	const [isMounted, setIsMouted] = useState(false);

	// DidMount
	useEffect(() => {
		setupGame();
	}, []);

	// // DidUpdate
	useEffect(() => {
		if (isMounted) {
			disconnectPlayer(history);
		}
		setIsMouted(true);
	}, [location.hash]);

	// WillUnmount
	useEffect(() => {
		return () => disconnectPlayer(history);
	}, []);

	return (
		<div className="App" style={ style }>
			<Grid grid={ grid } keyPressHandler={ keyPressHandler } />
		</div>
	);
};

App.propTypes = {
	grid: PropTypes.array,
	keyPressHandler: PropTypes.func,
	setupGame: PropTypes.func,
	history: PropTypes.object,
	disconnectPlayer: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
