import React from 'react';
import { PropTypes } from 'prop-types';

const Queue = ({ players }) => {
	return (
		<div>
			<div>Current players : { players.length } / 5</div>
		</div>
	);
};

Queue.propTypes = {
	players: PropTypes.array,
};

export default Queue;
