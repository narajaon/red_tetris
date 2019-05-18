import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { container, box, buttoneon } from '../style/loginForm.module.css';

const LoginForm = ({ logToGame, history }) => {
	const [ credentials, setCredentials ] = useState({ name: '', room: ''});

	function handleLogin(e) {
		setCredentials({ ...credentials, name: e.target.value.trim() });
	}

	function handleRoom(e) {
		setCredentials({ ...credentials, room: e.target.value.trim() });
	}

	return (
		<div>
			<h1>TET<span>R</span>IS</h1>
			<form
				onSubmit={ logToGame(credentials, history) }
			>
			<div className={ container }>
				<div className={ box }>
					<input data-jest="name" autoFocus type="text" onChange={ handleLogin } placeholder="name"/>
					<input data-jest="room" type="text" onChange={ handleRoom } placeholder="room"/>
					<button className={ buttoneon } data-jest="submit"><span>Start</span></button>
				</div>
			</div>
			</form>
		</div>
	);
};

LoginForm.propTypes = {
	logToGame: PropTypes.func,
	history: PropTypes.object,
};

export default withRouter(LoginForm);
