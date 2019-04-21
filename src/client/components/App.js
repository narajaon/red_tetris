import React from 'react';
import PropTypes from 'prop-types';
import Grid from '../containers/Grid';

const App = ({ listenToSocketEvents, location, initGame }) => {
	const style = {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
	};

	initGame(location.hash);
	listenToSocketEvents();

	return (
		<div className="App" style={ style }>
			<Grid/>
		</div>
	);
};

App.propTypes = {
	listenToSocketEvents: PropTypes.func,
	initGame: PropTypes.func,
	location: PropTypes.object,
};

export default App;
