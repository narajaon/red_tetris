import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { shadow } from '../style/aside.module.css';
import { aside } from '../style/tetris.module.css';

const mapStateToProps = ({ gameReducer }) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
	};
};

const Tetris = () => {
	
	return (
		<div className={ aside }>
			<div className={ shadow }></div>
			<div className={ shadow }></div>
		</div>
	);
};

Tetris.propTypes = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tetris));
