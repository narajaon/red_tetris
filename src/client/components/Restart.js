import React from 'react';
import { PropTypes } from 'prop-types';
import { restart as style } from '../style/tetris.module.css';
import { innerContainer, buttonBlue, buttonPink } from '../style/restart.module.css';

const Restart = ({ restartHandler, quitHandler }) => {
	return (
		<div
			className={ style }
			data-jest="restart"
		>
		<div className={ innerContainer }>
			<div>GAME OVER</div>
			<button className={ buttonBlue } onClick={ restartHandler } autoFocus><span>RESTART</span></button>
			<button className={ buttonPink } onClick={ quitHandler }><span>QUIT</span></button>
			</div>
		</div>
	);
};

Restart.propTypes = {
	restartHandler: PropTypes.func,
	quitHandler: PropTypes.func,
};

export default Restart;