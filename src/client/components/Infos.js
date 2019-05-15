import React from 'react';
import { PropTypes } from 'prop-types';
import { infos as style } from '../style/aside.module.css';

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
			<div>Name: { currentPlayer }</div>
			<div>Score: { score.total }</div>
			<div>GM: { getGM(currentPlayer, gameMaster, players) }</div>
			<div>Room: { room }</div>
			<div>Garbage: { score.garbage }</div>
			<div>Other players:</div>
			<div>
				{
					players.map(({ name }) => {
						if (name === currentPlayer) return null;
						
						return (
							<div
								key={ name }
								data-jest="infos-other-players"
							>
								{ name }
							</div>
						);
					})
				}
			</div>
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
