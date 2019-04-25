import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

import {} from '../actions/Socket';
import { rotatePiece, startAnimation, translatePiece } from '../actions/Grid';
import { KEYS } from '../constants';
import Grid from '../components/Grid';

const mapStateToProps = ({ gridReducer }) => {
	return {
		grid: gridReducer.grid,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		keyPressHandler: (event) => {
			switch (event.keyCode) {
			case KEYS.R:
				dispatch(rotatePiece());
				break;
			case KEYS.SPACE:
				dispatch(startAnimation());
				break;
			case KEYS.LEFT:
				dispatch(translatePiece({x: -1, y: 0}));
				break;
			case KEYS.RIGHT:
				dispatch(translatePiece({x: 1, y: 0}));
				break;
			case KEYS.DOWN:
				dispatch(translatePiece({x: 0, y: 1}));
				break;
			}
		},
	};
};

const App = ({ grid, keyPressHandler }) => {
	const style = {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
	};

	return (
		<div className="App" style={ style }>
			<Grid grid={ grid } keyPressHandler={ keyPressHandler } />
		</div>
	);
};

App.propTypes = {
	grid: PropTypes.array,
	keyPressHandler: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
