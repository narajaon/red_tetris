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

const defaultGrid = { grid: initGrid() };

const Aside = ({ top = defaultGrid, bottom = defaultGrid }) => {	
	return (
		<div className={ aside }>
			<Grid grid={ top.grid } tileStyle={ shadow }/>
			<Grid grid={ bottom.grid } tileStyle={ shadow }/>
		</div>
	);
};

Aside.propTypes = {
	top: PropTypes.object,
	bottom: PropTypes.object,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Aside));
