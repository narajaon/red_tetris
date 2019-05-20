import React from 'react';
import { PropTypes } from 'prop-types';
import { infos as style } from '../style/aside.module.css';
import { infocolor, scored } from '../style/infos.module.css';

const Infos = ({ currentPlayer, gameMaster, room, players, score }) => {
	const getGM = (player, gm, playerList) => {
		if (!playerList || !gm) return null;

		return player === gm.name  ? 'YOU' : `${gm.name}`;
	};

	return (
		<div
			className={ style }
			data-jest="infos"
		>
			<div>Name: <span className={ infocolor }> { currentPlayer }</span></div>
			<div>GM: <span className={ infocolor }> { getGM(currentPlayer, gameMaster, players) }</span></div>
			<div>Room: <span className={ infocolor }> { room }</span></div>
			<div>Garbage: <span className={ infocolor }>{ score.garbage }</span></div>
			<div className={ scored }>{ score.total }</div>
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
