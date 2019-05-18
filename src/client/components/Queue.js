import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { queue as style } from '../style/tetris.module.css';
import { innerContainer } from '../style/queue.module.css';

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
					<div className={ innerContainer }>
			<div>Current players :<br></br> { players.length } / 4</div>
			<div>Press <span>SPACE</span> to begin the game</div>
		</div>
		</div>
	);
};

Queue.propTypes = {
	players: PropTypes.array,
	startGame: PropTypes.func,
};

export default Queue;
