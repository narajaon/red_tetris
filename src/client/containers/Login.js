import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';

import LoginForm from '../components/LoginForm';
import { PHASES } from '../constants';
import { errorAction } from '../actions/errors';
import { formIsValid } from '../helpers/Login';
import { initPlayerAndRoom } from '../actions/Game';
import {
	listenToPhaseSwitch,
	emitAuthRequest,
	listenPlayersUpdate,
	emitPhaseSwitch,
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
				dispatch(emitPhaseSwitch(PHASES.ARRIVED));
			});

			dispatch(listenPlayersUpdate());
			dispatch(initPlayerAndRoom(name, room));
			
			return dispatch(emitAuthRequest());
		},
	};
};

const Login = ({ logToGame, phase, currentPlayer, room }) => {
	const style = {
		display: 'flex',
		alignItems: 'center',
	};

	if (phase !== PHASES.ARRIVED) {
		return (
			<Redirect
				to={{
					pathname: '/',
					hash: `#${room}[${currentPlayer}]`,
				}}
			/>
		);
	}

	return (
		<div className="login" style={ style }>
			<LoginForm logToGame={ logToGame }/>
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
