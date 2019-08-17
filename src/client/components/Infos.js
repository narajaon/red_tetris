import React from 'react';
import { PropTypes } from 'prop-types';

const getGM = (player, gm, playerList) => {
	if (!playerList || !gm) return null;

	return player === gm.name  ? 'YOU' : `${gm.name}`;
};

const Infos = ({ currentPlayer, gameMaster, room, players, score }) => {
	return (
		<div
			data-jest="infos"
		>
			<div>Name: <span> { currentPlayer }</span></div>
			<div>GM: <span> { getGM(currentPlayer, gameMaster, players) }</span></div>
			<div>Room: <span> { room }</span></div>
			<div>Garbage: <span>{ score.garbage }</span></div>
			<div>{ score.total }</div>
		</div>
	);
};

Infos.propTypes = {
	currentPlayer: PropTypes.string,
	gameMaster: PropTypes.object,
	room: PropTypes.string,
	players: PropTypes.array,
	score: PropTypes.object,
};

export default Infos;
