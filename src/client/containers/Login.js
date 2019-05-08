import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';

import LoginForm from '../components/LoginForm';
import Queue from '../components/Queue';
import { PHASES, KEYS } from '../constants';
import { errorAction } from '../actions/errors';
import { formIsValid } from '../helpers/Login';
import { initPlayerAndRoom, switchPhase } from '../actions/Game';
import {
	listenToPhaseSwitch,
	emitAuthRequest,
	emitGameStart,
	listenPlayersUpdate,
	emitRemovePlayer,
} from '../actions/Socket';

const mapStateToProps = ({ gameReducer }) => {
	const { phase, currentPlayer, room, players } = gameReducer;

	return {
		phase,
		currentPlayer,
		players,
		room,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		logToGame: ({ room, name }) => (e) => {
			e.preventDefault();

			if (!formIsValid(name, room)) {
				return dispatch(errorAction('Invalid form'));
			}

			window.addEventListener('unload', event => {
				event.preventDefault();
				dispatch(emitRemovePlayer());
				dispatch({ event: 'socket-logout', leave: true });
				dispatch(switchPhase(PHASES.ARRIVED));
				document.location.reload();
			});

			dispatch(listenPlayersUpdate());
			dispatch(initPlayerAndRoom(name, room));
			dispatch(listenToPhaseSwitch());

			return dispatch(emitAuthRequest());
		},
		startGame: () => (e) => {
			if (e.keyCode !== KEYS.SPACE) return;
			dispatch(emitGameStart());
		},
	};
};

const Login = ({ logToGame, phase, currentPlayer, room, players, startGame }) => {
	const style = {
		display: 'flex',
		alignItems: 'center',
	};

	const loginPhases = currenPhase => {
		switch (currenPhase) {
		case PHASES.STARTED:
			return (
				<Redirect
					to={{
						pathname: '/',
						hash: `#${room}[${currentPlayer}]`,
					}}
				/>
			);
		case PHASES.CONNECTED:
			return (
				<Queue players={ players } startGame={ startGame({ room }) }/>
			);
		default:
			return (
				<LoginForm logToGame={ logToGame }/>
			);
		}
	};
	
	return (
		<div className="login" style={ style }>
			{ loginPhases(phase) }
		</div>
	);
};

Login.propTypes = {
	logToGame: PropTypes.func,
	phase: PropTypes.string,
	currentPlayer: PropTypes.string,
	room: PropTypes.string,
	players: PropTypes.array,
	startGame: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
