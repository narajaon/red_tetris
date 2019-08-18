import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Grid } from '../components/Grid';
import { initGrid } from '../helpers/Grid';
import Infos from '../components/Infos';

const mapStateToProps = ({ gameReducer, gridReducer }) => {
	const { currentPlayer, room, players, gameMaster } = gameReducer;
	const { score } = gridReducer;

	return {
		currentPlayer,
		room,
		players,
		gameMaster,
		score,
	};
};

const defaultGrid = () => ({ grid: initGrid() });

const Aside = (props) => {
	const { top = defaultGrid(), bottom = defaultGrid(), infos, currentPlayer, room, players, gameMaster, score, className } = props;

	return (
		<div className={ className }>
			{infos ?
				<Infos
					currentPlayer={currentPlayer}
					gameMaster={gameMaster}
					room={room}
					players={players}
					score={score}
				/> :
				<Grid
					grid={ top.grid }
					type="shadow"
					player={ currentPlayer }/>}
			<Grid
				grid={ bottom.grid }
				type="shadow"
				player={ bottom.name }/>
		</div>
	);
};

Aside.propTypes = {
	top: PropTypes.object,
	bottom: PropTypes.object,
	infos: PropTypes.bool,
	room: PropTypes.string,
	currentPlayer: PropTypes.string,
	players: PropTypes.array,
	gameMaster: PropTypes.object,
	score: PropTypes.object,
};

export default withRouter(connect(mapStateToProps)(Aside));
