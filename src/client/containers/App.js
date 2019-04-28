import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { listenToNewPiece, listenToNewPlayers, listenToGlobalMessages } from '../actions/Socket';
import { rotatePiece, startAnimation, translatePiece } from '../actions/Grid';
import { KEYS, PHASES } from '../constants';
import Grid from '../components/Grid';

const mapStateToProps = ({ gridReducer, gameReducer }) => {
	return {
		grid: gridReducer.grid,
		interval: gridReducer.interval,
		phase: gameReducer.phase,
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
		removeListeners: () => {
			dispatch({ event: 'socket-logout', leave: true });
		}
	};
};

/**
 * TODO
 * - tell the server to delete the player from the lobby
 */

const App = ({ grid, phase, interval, keyPressHandler, setupGame, history, removeListeners }) => {
	const style = {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
	};

	const [isMounted, setIsMouted] = useState(false);
	const [isAllowed, setIsAllowed] = useState(true);

	function disconnectPlayer() {
		setIsAllowed(false);
		clearInterval(interval);
		// remove every socket event listeners
		removeListeners();
	}

	// DidMount
	useEffect(() => {
		setupGame();
	}, []);

	// // DidUpdate
	useEffect(() => {
		if (isMounted) {
			disconnectPlayer();
		}
		setIsMouted(true);
	}, [history]);

	if (!isAllowed || phase === PHASES.ARRIVED) return (<Redirect to="/login" />);

	return (
		<div className="App" style={ style }>
			<Grid grid={ grid } keyPressHandler={ keyPressHandler } />
		</div>
	);
};

App.propTypes = {
	grid: PropTypes.array,
	phase: PropTypes.string,
	interval: PropTypes.number,
	keyPressHandler: PropTypes.func,
	setupGame: PropTypes.func,
	history: PropTypes.object,
	removeListeners: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
