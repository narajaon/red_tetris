import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Grid from '../components/Grid';

import { shadow } from '../style/grid.module.css';
import { aside } from '../style/tetris.module.css';
import { initGrid } from '../helpers/Grid';

const mapStateToProps = ({ gameReducer }) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
	};
};

const Tetris = () => {	
	const shadowGrid = initGrid();
	const dummyHandler = () => null;
	
	return (
		<div className={ aside }>
			<Grid keyPressHandler={ dummyHandler } grid={ shadowGrid } tileStyle={ shadow }/>
			<Grid keyPressHandler={ dummyHandler } grid={ shadowGrid } tileStyle={ shadow }/>
		</div>
	);
};

Tetris.propTypes = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tetris));
