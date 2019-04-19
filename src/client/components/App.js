import React from 'react';
import Grid from '../containers/Grid';

const App = () => {
	const style = {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
	};

	return (
		<div className="App" style={ style }>
			<Grid/>
		</div>
	);
};

export default App;
