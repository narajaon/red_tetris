import React, { useEffect } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Home from './Home';
import Login from './LoginV2';
import Aside from './Aside';

import { listenToPhaseSwitch, emitPhaseSwitch } from '../actions/Socket';
import { PHASES } from '../constants';
import { Container } from '../style/Layouts';

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
		
		return resetSocket;
	}, []);

	return (
		<Container flexed>
			<Aside infos bottom={ player2 }/>
			<Container color="blue" flexed>
				<Switch>
					<Route exact path="/" component={ Home } />
					<Route path="/login" component={ Login } />
				</Switch>
			</Container>
			<Aside top={ player3 } bottom={ player4 }/>
		</Container>
	);
};

Tetris.propTypes = {
	player2: PropTypes.object,
	player3: PropTypes.object,
	player4: PropTypes.object,
	resetSocket: PropTypes.func,
	listenToPhases: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tetris));
