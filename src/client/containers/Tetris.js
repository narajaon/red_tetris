import React, { useEffect } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Home from './Home';
import Login from './Login';
import Aside from './Aside';

import { main, wrapper, bodyWrapper } from '../style/tetris.module.css';
import { listenToPhaseSwitch, emitPhaseSwitch } from '../actions/Socket';
import { PHASES } from '../constants';

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
			// debugger;
			dispatch(emitPhaseSwitch(PHASES.ARRIVED));
			dispatch({ event: 'phase-switch-event', leave: true });
		},
		listenToPhases: () => dispatch(listenToPhaseSwitch()),
	};
};

const flexStyle = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: '100%',
};

const Tetris = ({ player2, player3, player4, listenToPhases, resetSocket }) => {
	useEffect(() => {
		listenToPhases();
		// debugger;
		
		return resetSocket;
	}, []);

	return (
		<div className={ bodyWrapper }>
			<div className={ wrapper }>
				<Aside infos={ true } bottom={ player2 }/>
				<div className={ main }>
					<Switch>
						<Route exact path="/" component={ Home } />
						<Route path="/login" component={ Login } />
					</Switch>
				</div>
				<Aside top={ player3 } bottom={ player4 }/>
			</div>
		</div>
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
