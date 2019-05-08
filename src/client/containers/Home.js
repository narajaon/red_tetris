import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { listenToNewPiece, emitGameStart, emitPhaseSwitch } from '../actions/Socket';
import { rotatePiece, translatePiece } from '../actions/Grid';
import { KEYS, PHASES } from '../constants';
import Grid from '../components/Grid';

import { regular } from '../style/grid.module.css';
import Restart from '../components/Restart';
import Queue from '../components/Queue';

const mapStateToProps = ({ gridReducer, gameReducer }) => {
	return {
		grid: gridReducer.grid,
		interval: gridReducer.interval,
		phase: gameReducer.phase,
		players: gameReducer.players,
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
		disconnectPlayer: () => {
			dispatch(emitPhaseSwitch(PHASES.ARRIVED));
			dispatch({ event: 'socket-logout', leave: true });
		},
		restartHandler: () => {
			dispatch(emitPhaseSwitch(PHASES.CONNECTED));
		},
		quitHandler: () => {
			dispatch(emitPhaseSwitch(PHASES.ARRIVED));
		},
		startGame: (e) => {
			if (e.keyCode !== KEYS.SPACE) return;
			dispatch(emitGameStart());
		},
	};
};

const Home = (props) => {
	const {
		phase,
		interval,
		setupGame,
		history,
		disconnectPlayer,
	} = props;

	const style = {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
	};

	const [isAllowed, setIsAllowed] = useState(true);

	useEffect(() => {
		setupGame();

		return () => {
			disconnectPlayer(interval);
			setIsAllowed(false);
		};
	}, [history.location]);

	const displayContent = (playerIsAllowed, gamePhase, mainProps) => {
		if (gamePhase === PHASES.CONNECTED){
			return (<Queue { ...mainProps } />);
		}

		if (!playerIsAllowed || gamePhase === PHASES.ARRIVED) {
			return (<Redirect to="/login" />);
		}

		if (gamePhase === PHASES.ENDED){
			return (<Restart { ...mainProps } />);
		}

		return (
			<Grid { ...mainProps } />
		);
	};

	return (
		<div className="Home" style={ style }>
			{
				displayContent(isAllowed, phase, {
					...props,
					tileStyle: regular,
				})
			}
		</div>
	);
};

Home.propTypes = {
	phase: PropTypes.string,
	interval: PropTypes.number,
	setupGame: PropTypes.func,
	history: PropTypes.object,
	disconnectPlayer: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));