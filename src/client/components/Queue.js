import React, { useState, useEffect, useCallback } from 'react';
import { PropTypes } from 'prop-types';
import { queue as style } from '../style/tetris.module.css';
import { innerContainer } from '../style/queue.module.css';

const Queue = ({ players, startGame }) => {
	const [contentRef, setRef] = useState(null);
	const refSetter = useCallback(element => setRef(element), []);

	useEffect(() => {
		if (contentRef) {
			contentRef.focus();
		}
	}, [contentRef]);

	return (
		<div
			tabIndex="0"
			ref={refSetter}
			onKeyDown={ startGame }
			data-jest="queue"
		>
			<div>Current players :<br></br> { players.length } / 4</div>
			<div>Press <span>SPACE</span> to begin the game</div>
		</div>
	);
};

Queue.propTypes = {
	players: PropTypes.array,
	startGame: PropTypes.func,
};

export default Queue;
