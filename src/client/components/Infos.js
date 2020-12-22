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
			style={{ display: 'flex', flexDirection: 'column' }}
		>
			<StyledLabel>Name : { currentPlayer }</StyledLabel>
			<StyledLabel>GM : { getGM(currentPlayer, gameMaster, players) }</StyledLabel>
			<StyledLabel>Room : { room }</StyledLabel>
			<StyledLabel color="#5ff967">Score : { score.total }</StyledLabel>
			{players.length > 1 && <StyledLabel data-jest="infos-other-players" color="#ff6d67">Garbage : { score.garbage }</StyledLabel>}
		</div>
	);
};

const StyledLabel = styled.span`
	color: ${({ theme, color }) => color || theme.colors.secondary};
  width: 100%;

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
