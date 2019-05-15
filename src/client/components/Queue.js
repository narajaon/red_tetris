import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { queue as style } from '../style/tetris.module.css';

const Queue = ({ players, startGame }) => {
	const [contentRef, setRef] = useState(null);

	useEffect(() => {
		if (contentRef) {
			contentRef.focus();
		}
	});

	return (
		<div
			tabIndex="0"
			ref={ element => {
				setRef(element);
			}}
			onKeyDown={ startGame }
			data-jest="queue"
			className={ style }
		>
			<div>Current players : { players.length } / 4</div>
			<div>Press SPACE to begin the game</div>
		</div>
	);
};

Queue.propTypes = {
	players: PropTypes.array,
	startGame: PropTypes.func,
};

export default Queue;
