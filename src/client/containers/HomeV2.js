import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { listenToNewPiece, emitGameStart, emitPhaseSwitch, listenToAddBlocks } from '../actions/Socket';
import { rotatePiece, translatePiece } from '../actions/Grid';
import { KEYS, PHASES, DEBOUNCE_VAL } from '../constants';
import Grid from '../components/Grid';
import Restart from '../components/Restart';
import Queue from '../components/Queue';

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
		keyPressHandler:
		// _.debounce(
			(event) => {
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
		// DEBOUNCE_VAL, {
		// 	leading: true,
		// 	trailing: false
		// }),
		setupGame: () => {
			dispatch(listenToNewPiece());
			dispatch(listenToAddBlocks());
		},
		disconnectPlayer: () => {
			dispatch(emitPhaseSwitch(PHASES.ARRIVED));
			dispatch({ event: 'new-piece-event', leave: true });
			dispatch({ event: 'add-garbage-event', leave: true });
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

const displayContent = (playerIsAllowed, gamePhase, mainProps) => {
	if (gamePhase === PHASES.CONNECTED){
		return (<Queue players={mainProps.players} startGame={mainProps.startGame}/>);
	}

	if (!playerIsAllowed || gamePhase === PHASES.ARRIVED) {
		return (<Redirect to="/login" />);
	}

	if (gamePhase === PHASES.ENDED){
		return (
			<Restart
				restartHandler={mainProps.restartHandler}
				quitHandler={mainProps.quitHandler}
			/>);
	}

	return (
		<Grid
			keyPressHandler={mainProps.keyPressHandler}
			grid={mainProps.grid}
			placed={mainProps.placed}
			player={mainProps.player}
			ref={mainProps.ref}
			type="regular"
		/>
	);
};

const Home = (props) => {
	const {
		phase,
		setupGame,
		history,
		disconnectPlayer,
		pieces,
		placed,
		keyPressHandler
	} = props;

	const [isAllowed, setIsAllowed] = useState(true);
	const contentRef = useRef(null);

	useEffect(() => {
		if (contentRef && contentRef.current) {
			contentRef.current.focus();
		}
	}, [contentRef, contentRef.current]);

	useEffect(() => {
		setupGame();

		return () => {
			disconnectPlayer();
			setIsAllowed(false);
		};
	}, [history.location]);

	return (
		displayContent(isAllowed, phase, {
			...props,
			keyPressHandler,
			ref: contentRef,
			quitHandler: disconnectPlayer,
			placed: pieces ? '' : placed,
			type: 'regular'
		})
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