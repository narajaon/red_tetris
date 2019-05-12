import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { listenToNewPiece, emitGameStart, emitPhaseSwitch } from '../actions/Socket';
import { rotatePiece, translatePiece } from '../actions/Grid';
import { KEYS, PHASES } from '../constants';
import Grid from '../components/Grid';
import Restart from '../components/Restart';
import Queue from '../components/Queue';

import { regular, isEmpty, isPlaced, isFull, placed, container as containerStyle } from '../style/grid.module.css';
import { home as style } from '../style/tetris.module.css';

const mapStateToProps = ({ gridReducer, gameReducer }) => {
	return {
		grid: gridReducer.grid,
		interval: gridReducer.interval,
		pieces: gridReducer.pieces,
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
			dispatch({ event: 'new-piece-event', leave: true });
		},
		restartHandler: () => {
			dispatch(emitPhaseSwitch(PHASES.CONNECTED));
		},
		startGame: (e) => {
			if (e.keyCode !== KEYS.SPACE) return;
			dispatch(emitGameStart());
		},
	};
};

const tileClasses = [
	`${regular} ${isEmpty}`,
	`${regular} ${isFull}`,
	`${regular} ${isPlaced}`,
];

const Home = (props) => {
	const {
		phase,
		setupGame,
		history,
		disconnectPlayer,
		pieces,
	} = props;

	const [isAllowed, setIsAllowed] = useState(true);

	useEffect(() => {
		setupGame();

		return () => {
			disconnectPlayer();
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
		<div className={ style }>
			{
				displayContent(isAllowed, phase, {
					...props,
					tileStyle: tileClasses,
					quitHandler: disconnectPlayer,
					containerStyle,
					placed: pieces ? '' : placed,
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
	pieces: PropTypes.object,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));