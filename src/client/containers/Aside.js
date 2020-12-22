import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Grid } from '../components/Grid';
import { initGrid } from '../helpers/Grid';
import Infos from '../components/Infos';
import { Container } from '../style/Layouts';

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

export const AsideComponent = ({ top, bottom, infos, currentPlayer, room, players, gameMaster, score }) => {
	// console.log({ infos });
	
	return (
		<StyledAside flexed direction="column" justify="space-between" align="center">
			{infos ?
				<Infos
					data-jest='aside-info'
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
		</StyledAside>
	);
};

const StyledAside = styled(Container)`
`;

AsideComponent.defaultProps = {
	top: defaultGrid(),
	bottom: defaultGrid(),
};

AsideComponent.propTypes = {
	top: PropTypes.object,
	bottom: PropTypes.object,
	infos: PropTypes.bool,
	room: PropTypes.string,
	currentPlayer: PropTypes.string,
	players: PropTypes.array,
	gameMaster: PropTypes.object,
	score: PropTypes.object,
};

const ConnectedAside = withRouter(connect(mapStateToProps)(AsideComponent));

export default ConnectedAside;
