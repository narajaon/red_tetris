import { withRouter } from 'react-router-dom';
import React, { useState, useCallback } from 'react';
import { PropTypes } from 'prop-types';
import styled, { css } from 'styled-components';
import { Container } from '../style/Layouts';

const LoginForm = ({ logToGame, history }) => {
	const [ credentials, setCredentials ] = useState({ name: '', room: ''});
	console.log('loginForm');

	const updateInputField = useCallback((inputField) => (e) => {
		setCredentials({ ...credentials, [inputField]: e.target.value.trim() });
	}, [credentials]);

	return (
		<Container>
			<StyledTitle>TET<StyledR>R</StyledR>IS</StyledTitle>
			<form
				onSubmit={ logToGame(credentials, history) }
			>
				<Container flexed direction="column">
					<input data-jest="name" autoFocus type="text" onChange={ updateInputField('name') } placeholder="name"/>
					<input data-jest="room" type="text" onChange={ updateInputField('room') } placeholder="room"/>
					<button data-jest="submit">Start</button>
				</Container>
			</form>
		</Container>
	);
};

const StyledTitle = styled.h1`
	text-align: center;
    text-shadow: 0 0 10px ${({ theme }) => theme.colors.main};
    color: ${({ theme }) => theme.colors.main};
`;

const StyledR = styled.span`
	color:${({ theme }) => theme.colors.secondary};
    text-shadow: 0 0 10px ${({ theme }) => theme.colors.secondary};		
`;

LoginForm.propTypes = {
	logToGame: PropTypes.func,
	history: PropTypes.object,
};

export default withRouter(LoginForm);
