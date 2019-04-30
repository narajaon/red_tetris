import React from 'react';
import { PropTypes } from 'prop-types';

const Queue = ({ players, startGame }) => {
	return (
		<div
			tabIndex="0"
			onKeyDown={ startGame }
		>
			<div>Current players : { players.length } / 4</div>
			<div>Press ENTER to begin the game</div>
		</div>
	);
};

Queue.propTypes = {
	players: PropTypes.array,
	startGame: PropTypes.func,
};

export default Queue;
