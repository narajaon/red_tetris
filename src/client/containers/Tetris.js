import React, { useEffect } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Home from './Home';
import Login from './Login';
import Aside from './Aside';
import { listenToPhaseSwitch, emitPhaseSwitch } from '../actions/Socket';
import { PHASES } from '../constants';
import { Container } from '../style/Layouts';
import { initDocStyle } from '../style/Tetris';

const mapStateToProps = ({ gameReducer }) => {
	const { players, currentPlayer } = gameReducer;
	const otherPlayers = players.filter(player => player.name !== currentPlayer);
	const [ player2, player3, player4 ] = otherPlayers;

	return {
		player2,
		player3,
		player4,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		resetSocket: () => {
			dispatch(emitPhaseSwitch(PHASES.ARRIVED));
			dispatch({ event: 'phase-switch-event', leave: true });
		},
		listenToPhases: () => dispatch(listenToPhaseSwitch()),
	};
};

const Tetris = ({ player2, player3, player4, listenToPhases, resetSocket }) => {
	useEffect(() => {
		listenToPhases();
		initDocStyle();

		return resetSocket;
	}, []);

	return (
		<Wrapper flexed justify="center" align="center">
			<StyledContainer flexed justify="space-between">
				<Aside infos bottom={ player2 }/>
				<StyledMain flexed align="center">
					<Switch>
						<Route exact path="/" component={ Home } />
						<Route path="/login" component={ Login } />
					</Switch>
				</StyledMain>
				<Aside top={ player3 } bottom={ player4 }/>
			</StyledContainer>
		</Wrapper>
	);
};

const Wrapper = styled(Container)`
	height: 100%;
	width: 100;
	font-family: monaco,Consolas,Lucida Console,monospace;
	color: ${({ theme }) => theme.colors.main};
	background-color: ${({ theme }) => theme.colors.background};

	*:focus {
		outline: none;
	}
`;

const StyledContainer = styled(Container)`
	border: 1px solid ${({ theme }) => theme.colors.main};
	padding: 30px;
`;

const StyledMain = styled(Container)`
	margin: 0 30px;
	/* border: 1px solid ${({ theme }) => theme.colors.main}; */
`;


Tetris.propTypes = {
	player2: PropTypes.object,
	player3: PropTypes.object,
	player4: PropTypes.object,
	resetSocket: PropTypes.func,
	listenToPhases: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tetris));
