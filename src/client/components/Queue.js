import React, { useState, useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types';
import styled, { css } from 'styled-components';

import { queue as style } from '../style/tetris.module.css';
import { innerContainer } from '../style/queue.module.css';

const Queue = ({ players, startGame }) => {
	const contentRef = useRef(null);

	useEffect(() => {
		console.log('FOCUS');
		if(contentRef && contentRef.current) {
			contentRef.current.focus();
		}
	}, []);

	return (
		<StyledQueue
			tabIndex="0"
			ref={contentRef}
			onKeyDown={ startGame }
			data-jest="queue"
		>
			<div>Current players :</div>
			<div>{ players.length } / 4</div>
			<div>Press <StyledSpace /> to begin the game</div>
		</StyledQueue>
	);
};

const StyledQueue = styled.div`
	text-align: center;
`;

const StyledSpace = styled.span`
	text-decoration: underline;

	:after {
		content: "SPACE";
	}
`;

Queue.propTypes = {
	players: PropTypes.array,
	startGame: PropTypes.func,
};

export default Queue;
