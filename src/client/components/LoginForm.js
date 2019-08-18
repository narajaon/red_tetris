import { withRouter } from 'react-router-dom';
import React, { useState, useCallback } from 'react';
import { PropTypes } from 'prop-types';
import styled, { css } from 'styled-components';
import { Container, Flexed } from '../style/Layouts';
import { StyledButton } from '../style/Elements';

const LoginForm = ({ logToGame, history }) => {
	const [ credentials, setCredentials ] = useState({ name: '', room: ''});
	console.log('loginForm');

	const updateInputField = useCallback((inputField) => (e) => {
		setCredentials({ ...credentials, [inputField]: e.target.value.trim() });
	}, [credentials]);

	return (
		<StyledForm
			onSubmit={ logToGame(credentials, history) }
			flexed
			direction="column"
			justify="space-around"
			align="center"
		>
			<StyledTitle>./TET<StyledR />IS</StyledTitle>
			<Container flexed direction="column" align="center">
				<StyledInput data-jest="name" autoFocus type="text" onChange={ updateInputField('name') } placeholder="<name>"/>
				<StyledInput data-jest="room" type="number" onChange={ updateInputField('room') } placeholder="<room>" min="0"/>
			</Container>
			<StyledButton data-jest="submit">Start</StyledButton>
		</StyledForm>
	);
};

const StyledTitle = styled.h1`
`;

const StyledForm = styled.form`
	${Flexed}
	height: 100%;
`;

const StyledInput = styled.input`
	background: ${({ theme }) => theme.colors.background};
	caret-color: ${({ theme }) => theme.colors.main};
	color: ${({ theme }) => theme.colors.main};
	text-align: center;
    border: none;
	font-size: 20px;
	appearance: none;
	margin: 0%;

	::placeholder {
		text-align: center;
		margin-left: 10px;
	}
`;

const StyledR = styled.span`
	color:${({ theme }) => theme.colors.secondary};
	
	::after {
		content: "R";
	}
`;

LoginForm.propTypes = {
	logToGame: PropTypes.func,
	history: PropTypes.object,
};

export default withRouter(LoginForm);
