import React from 'react';
import { PropTypes } from 'prop-types';	
import { infos as style } from '../style/aside.module.css';

const Infos = ({ currentPlayer, gameMaster, room, players }) => {
	
	const getGM = (player, gm, playerList) => {
		if (!playerList || !gm) return null;
		
		return player === gm.name  ? 'You are the GM' : `${gm.name} is the GM`;
	};

	return (
		<div
			className={ style }
		>
			<div>Name: { currentPlayer }</div>
			<div>{ getGM(currentPlayer, gameMaster, players) }</div>
			<div>Room: { room }</div>
			<div>Other players:</div>
			<div>
				{
					players.map(({ name }) => {
						if (name !== currentPlayer) {
							return (<div key={ name }>{ name }</div>);
						}

						return null;
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
};

export default Infos;
