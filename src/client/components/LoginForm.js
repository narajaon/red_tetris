import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

/**
 * TODO :
 * - add history.push to startGame
 * - redirect to login on bad credetials
 * - add change listener to hash
 */
const LoginForm = ({ logToGame, history }) => {
	const style = {
		display: 'flex',
		flexDirection: 'column',
		width: '200px',
	};

	const [ credentials, setCredentials ] = useState({ name: '', room: ''});

	function handleLogin(e) {
		setCredentials({ ...credentials, name: e.target.value.trim() });
	}

	function handleRoom(e) {
		setCredentials({ ...credentials, room: e.target.value.trim() });
	}

	return (
		<div>
			<form
				style={ style }
				onSubmit={ logToGame(credentials, history) }
				className="login-form"
			>
				<input autoFocus type="text" onChange={ handleLogin } placeholder="name"/>
				<input type="text" onChange={ handleRoom } placeholder="room"/>
				<input type="submit" value="Let's GO"/>
			</form>
		</div>
	);
};

LoginForm.propTypes = {
	logToGame: PropTypes.func,
	history: PropTypes.object,
};

export default withRouter(LoginForm);
