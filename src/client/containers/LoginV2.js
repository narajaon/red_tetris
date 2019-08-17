import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import LoginForm from '../components/LoginForm';
import { PHASES } from '../constants';
import { errorAction } from '../actions/errors';
import { formIsValid } from '../helpers/Login';
import { initPlayerAndRoom } from '../actions/Game';
import {
	emitAuthRequest,
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

			window.addEventListener('beforeunload', event => {
				event.preventDefault();
				dispatch(emitRemovePlayer());
				dispatch({ event: 'update-players', leave: true });
			});

			dispatch(listenPlayersUpdate());
			dispatch(initPlayerAndRoom(name, room));
			
			return dispatch(emitAuthRequest());
		},
	};
};

const Login = ({ logToGame, phase, currentPlayer, room }) => {
	console.log('login');
	
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
		<LoginForm logToGame={ logToGame }/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
