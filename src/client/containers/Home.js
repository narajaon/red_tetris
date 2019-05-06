import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { listenToNewPiece, emitRemovePlayer } from '../actions/Socket';
import { rotatePiece, translatePiece, resetGrid } from '../actions/Grid';
import { KEYS, PHASES } from '../constants';
import Grid from '../components/Grid';
import { switchPhase } from '../actions/Game';

import { regular } from '../style/grid.module.css';

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
		},
		reinitGame: (interval) => {
			dispatch(emitRemovePlayer());
			dispatch({ event: 'socket-logout', leave: true });
			dispatch(switchPhase(PHASES.ARRIVED));
			dispatch(resetGrid());
			clearInterval(interval);
			document.location.reload();
		}
	};
};

const Home = ({ grid, phase, interval, keyPressHandler, setupGame, history, reinitGame }) => {
	const style = {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
	};

	const [isAllowed, setIsAllowed] = useState(true);

	useEffect(() => {
		setupGame();
		
		return () => {
			reinitGame(interval);
			setIsAllowed(false);
		};
	}, [history.location]);

	if (!isAllowed || phase === PHASES.ARRIVED) {
		return (<Redirect to="/login" />);
	}

	return (
		<div className="Home" style={ style }>
			<Grid grid={ grid } keyPressHandler={ keyPressHandler } tileStyle={ regular } />
		</div>
	);
};

Home.propTypes = {
	grid: PropTypes.array,
	phase: PropTypes.string,
	interval: PropTypes.number,
	keyPressHandler: PropTypes.func,
	setupGame: PropTypes.func,
	history: PropTypes.object,
	reinitGame: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));