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
			<div>GM: { getGM(currentPlayer, gameMaster, players) }</div>
			<div>Room: { room }</div>
			<div>Garbage: { score.garbage }</div>
			<div className='score'>{ score.total }</div>
			<style>
		{`
			.score{
				border: 10px solid #f0f;
				border-radius: 50%;
				width: 120px;
				height: 120px;
				margin: 50px auto;  
				background: rgba(0,0,0,0.4);
				box-shadow:  
				0 0 20px #f0f,
				inset 0 0 20px #f0f;
				display: flex;
				align-items: center;				
				justify-content: center;				
				text-shadow:  
				0 0 10px #0ff;
				color:#0ff;  
				font-size: 60px!important;    
			}
			
		`}
		</style>
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
