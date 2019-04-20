import React from 'react';
import PropTypes from 'prop-types';
import Grid from '../containers/Grid';

const App = ({ listenToSocketEvents }) => {
	const style = {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
	};

	listenToSocketEvents();

	return (
		<div className="App" style={ style }>
			<Grid/>
		</div>
	);
};

App.propTypes = {
	listenToSocketEvents: PropTypes.func,
};

export default App;
