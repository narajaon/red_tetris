import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter, Redirect } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { listenToNewPiece, emitGameStart, emitPhaseSwitch, listenToAddBlocks } from '../actions/Socket';
import { rotatePiece, translatePiece } from '../actions/Grid';
import { KEYS, PHASES } from '../constants';
import { GridWrapper as Grid } from '../components/Grid';
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

export const mapDispatchToProps = (dispatch) => {
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
			if (e.keyCode !== KEYS.ENTER) return;
			dispatch(emitGameStart());
		},
	};
};

const Content = ({ isAllowed, phase, mainProps }) => {
	if (phase === PHASES.CONNECTED){
		return (<Queue players={mainProps.players} startGame={mainProps.startGame}/>);
	}

	if (!isAllowed || phase === PHASES.ARRIVED) {
		return (<Redirect to="/login" />);
	}

	if (phase === PHASES.ENDED){
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

export const HomeComponent = ({
	phase,
	setupGame,
	history = {},
	disconnectPlayer,
	pieces,
	placed,
	keyPressHandler,
	...rest
}) => {
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
		<Content
			isAllowed={isAllowed}
			phase={phase}
			mainProps={{
				...rest,
				keyPressHandler,
				ref: contentRef,
				quitHandler: disconnectPlayer,
				placed: pieces ? '' : placed,
				type: 'regular'
			}}
		/>
	);
};

HomeComponent.propTypes = {
	phase: PropTypes.string,
	interval: PropTypes.number,
	setupGame: PropTypes.func,
	history: PropTypes.object,
	disconnectPlayer: PropTypes.func,
	pieces: PropTypes.array,
};

const ConnectedHome = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(HomeComponent);

export default ConnectedHome;
