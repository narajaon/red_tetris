import React from 'react';
import { PropTypes } from 'prop-types';

const Restart = ({ restartHandler, quitHandler }) => {
	return (
		<div
			data-jest="restart"
		>
			<div>
				<div>GAME OVER</div>
				<button onClick={ restartHandler } autoFocus><span>RESTART</span></button>
				<button onClick={ quitHandler }><span>QUIT</span></button>
			</div>
		</div>
	);
};

Restart.propTypes = {
	restartHandler: PropTypes.func,
	quitHandler: PropTypes.func,
};

export default Restart;