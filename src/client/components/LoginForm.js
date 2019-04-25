import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

/**
 * TODO :
 * - add history.push to startGame
 * - redirect to login on bad credetials
 * - add change listener to hash
 */
const LoginForm = ({ startGame, history }) => {
	const style = {
		display: 'flex',
		flexDirection: 'column',
		width: '200px',
	};

	const [ credentials, setCredentials ] = useState({ login: '', room: ''});

	function handleLogin(e) {
		setCredentials({ ...credentials, login: e.target.value });
	}

	function handleRoom(e) {
		setCredentials({ ...credentials, room: e.target.value });
	}

	return (
		<div>
			<div>{ credentials.login } { credentials.room }</div>
			<form
				style={ style }
				onSubmit={ startGame(history) }
				className="login-form"
			>
				<input type="text" onChange={ handleLogin } placeholder="login"/>
				<input type="text" onChange={ handleRoom } placeholder="room"/>
				<input type="submit" value="Let's GO"/>
			</form>
		</div>
	);
};

LoginForm.propTypes = {
	startGame: PropTypes.func,
	history: PropTypes.object,
};

export default withRouter(LoginForm);
