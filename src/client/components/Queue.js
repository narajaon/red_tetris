import React, { useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const Queue = ({ players, startGame }) => {
	const contentRef = useRef(null);

	useEffect(() => {
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
			<p>Current players :</p>
			<p>{ players.length } / 4</p>
			<p>Press <StyledSpace /> to begin the game</p>
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
