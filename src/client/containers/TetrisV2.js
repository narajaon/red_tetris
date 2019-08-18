import React, { useEffect } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Home from './HomeV2';
import Login from './LoginV2';
import Aside from './AsideV2';
import { listenToPhaseSwitch, emitPhaseSwitch } from '../actions/Socket';
import { PHASES } from '../constants';
import { Container, Flexed } from '../style/Layouts';
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
	console.log('tetris');
	
	useEffect(() => {
		listenToPhases();
		initDocStyle();
		
		return resetSocket;
	}, []);

	return (
		<Wrapper flexed justify="center" align="center">
			<StyledContainer flexed justify="space-between">
				<StyledAside flexed direction="column" justify="center" infos bottom={ player2 }/>
				<StyledMain color="blue" flexed align="center">
					<Switch>
						<Route exact path="/" component={ Home } />
						<Route path="/login" component={ Login } />
					</Switch>
				</StyledMain>
				<StyledAside flexed direction="column" justify="center" top={ player3 } bottom={ player4 }/>
			</StyledContainer>
		</Wrapper>
	);
};

const Wrapper = styled(Container)`
	height: 100%;
	width: 100;
	/* transform: rotateX(60deg) rotateY(0deg) rotateZ(-45deg); */
`;

const StyledContainer = styled(Container)`
	border: 1px solid black;
	/* width: 90%; */
`;

const StyledMain = styled(Container)`
	/* flex: 1; */
`;

const StyledAside = styled(Aside)`
	${Flexed}
`;

Tetris.propTypes = {
	player2: PropTypes.object,
	player3: PropTypes.object,
	player4: PropTypes.object,
	resetSocket: PropTypes.func,
	listenToPhases: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tetris));
