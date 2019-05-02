import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Home from './Home';
import Login from './Login';
import Aside from './Aside';

import { main, wrapper } from '../style/tetris.module.css';

const mapStateToProps = ({ gameReducer }) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
	};
};

const flexStyle = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: '100%',
};

const Tetris = () => {
	
	return (
		<div style={ flexStyle }>
			<div className={ wrapper }>
				<Aside/>
				<div className={ main }>
					<Switch>
						<Route exact path="/" component={ Home } />
						<Route path="/login" component={ Login } />
					</Switch>
				</div>
				<Aside/>
			</div>
		</div>
	);
};

Tetris.propTypes = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tetris));
