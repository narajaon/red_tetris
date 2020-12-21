import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const getGM = (player, gm, playerList) => {
	if (!playerList || !gm) return null;

	return player === gm.name  ? 'YOU' : `${gm.name}`;
};

const Infos = ({ currentPlayer, gameMaster, room, players, score }) => {
	return (
		<div
			data-jest="infos"
		>
			<div><StyledLabel label="Name"/>: { currentPlayer }</div>
			<div><StyledLabel label="GM"/>: { getGM(currentPlayer, gameMaster, players) }</div>
			<div><StyledLabel label="Room"/>: { room }</div>
			<div><StyledLabel label="Score" color="#5ff967"/>: { score.total }</div>
			{players.length > 1 && <div data-jest="infos-other-players"><StyledLabel label="Garbage" color="#ff6d67"/>: { score.garbage }</div>}
		</div>
	);
};

const StyledLabel = styled.span`
	color: ${({ theme, color }) => color || theme.colors.secondary};

	::before {
		content: "${({ label }) => label}";
	}
`;

Infos.propTypes = {
	currentPlayer: PropTypes.string,
	gameMaster: PropTypes.object,
	room: PropTypes.string,
	players: PropTypes.array,
	score: PropTypes.object,
};

export default Infos;
