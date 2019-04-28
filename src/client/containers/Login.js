import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';

import LoginForm from '../components/LoginForm';
import Queue from '../components/Queue';
import { PHASES } from '../constants';
import { errorAction } from '../actions/errors';
import { formIsValid } from '../helpers/Login';
import { listenToPhaseSwitch, emitAuthRequest, listenToNewPlayers } from '../actions/Socket';
import { initPlayerAndRoom } from '../actions/Game';

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

			// const parsedRoom = Number.parseInt(room);
			dispatch(initPlayerAndRoom(name, room));
			dispatch(listenToNewPlayers());
			dispatch(listenToPhaseSwitch());

			return dispatch(emitAuthRequest(name, room));
		}
	};
};

const Login = ({ logToGame, phase, currentPlayer, room, players }) => {
	const style = {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
	};

	if (phase === PHASES.CONNECTED) {
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
			<Queue players={ players }/>
		</div>
	);
};

Login.propTypes = {
	logToGame: PropTypes.func,
	phase: PropTypes.string,
	currentPlayer: PropTypes.string,
	room: PropTypes.string,
	players: PropTypes.array,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
