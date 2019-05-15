import React from 'react';
import { PropTypes } from 'prop-types';
import { restart as style } from '../style/tetris.module.css';

const Restart = ({ restartHandler, quitHandler }) => {
	return (
		<div
			className={ style }
			data-jest="restart"
		>
			<div>GAME OVER</div>
			<button onClick={ restartHandler } autoFocus>RESTART ?</button>
			<button onClick={ quitHandler }>QUIT</button>
		</div>
	);
};

Restart.propTypes = {
	restartHandler: PropTypes.func,
	quitHandler: PropTypes.func,
};

export default Restart;