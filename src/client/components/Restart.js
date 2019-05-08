import React from 'react';
import { PropTypes } from 'prop-types';
import { restart as style } from '../style/grid.module.css';

const Restart = ({ restartHandler }) => {
	return (
		<div
			className={ style }
		>
			<div>GAME OVER</div>
			<button onClick={ restartHandler }>RESTART ?</button>
			<button onClick={ () => null }>QUIT</button>
		</div>
	);
};

Restart.propTypes = {
	restartHandler: PropTypes.func,
};

export default Restart;