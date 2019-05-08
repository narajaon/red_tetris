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
import Restart from '../components/Restart';

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
		disconnectPlayer: (interval) => {
			dispatch(emitRemovePlayer());
			dispatch({ event: 'socket-logout', leave: true });
			dispatch(switchPhase(PHASES.ARRIVED));
			dispatch(resetGrid());
			clearInterval(interval);
			document.location.reload();
		},
		restartHandler: (interval) => {
			console.log('RESTARTED');
		},
	};
};

const Home = ({ grid, phase, interval, keyPressHandler, setupGame, history, disconnectPlayer, restartHandler }) => {
	const style = {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
	};

	const displayGrid = (gamePhase, props) => {
		if (gamePhase === PHASES.ENDED){
			return (<Restart { ...props } />);
		}

		return (
			<Grid { ...props } />
		);
	};

	const [isAllowed, setIsAllowed] = useState(true);

	useEffect(() => {
		setupGame();
		
		return () => {
			disconnectPlayer(interval);
			setIsAllowed(false);
		};
	}, [history.location]);

	if (!isAllowed || phase === PHASES.ARRIVED) {
		return (<Redirect to="/login" />);
	}

	return (
		<div className="Home" style={ style }>
			{
				displayGrid(phase, {
					grid,
					keyPressHandler,
					tileStyle: regular,
					restartHandler,
				})
			}
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
	disconnectPlayer: PropTypes.func,
	restartHandler: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));