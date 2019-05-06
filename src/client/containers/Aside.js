import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Grid from '../components/Grid';

import { shadow } from '../style/grid.module.css';
import { content } from '../style/aside.module.css';
import { aside } from '../style/tetris.module.css';
import { initGrid } from '../helpers/Grid';
import Infos from '../components/Infos';

const mapStateToProps = ({ gameReducer }) => {
	const { currentPlayer, room, players, gameMaster } = gameReducer;
	
	return {
		currentPlayer,
		room,
		players,
		gameMaster,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
	};
};

const defaultGrid = { grid: initGrid() };

const Aside = ({ top = defaultGrid, bottom = defaultGrid, infos, currentPlayer, room, players, gameMaster }) => {
	function renderInfos(infoComponent, props) {
		if (infoComponent) {
			return (<Infos { ...props } />);
		}

		return (<Grid { ...props } />);
	}
	
	return (
		<div className={ aside }>
			<div className={ content }>
				{
					renderInfos(infos, {
						currentPlayer,
						players,
						gameMaster,
						grid: top.grid,
						tileStyle: shadow,
						room,
					}) 
				}
			</div>
			<div className={ content }>
				<Grid grid={ bottom.grid } tileStyle={ shadow }/>
			</div>
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
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Aside));
