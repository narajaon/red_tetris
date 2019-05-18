import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Grid from '../components/Grid';
import { initGrid } from '../helpers/Grid';
import Infos from '../components/Infos';

import { shadow, isEmpty, isPlaced, isFull, isUndestructible, shadowContainer as containerStyle } from '../style/grid.module.css';
import { content } from '../style/aside.module.css';
import { aside } from '../style/tetris.module.css';

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

const mapDispatchToProps = (dispatch) => {
	return {
	};
};

const defaultGrid = { grid: initGrid() };

const tileClasses = [
	`${shadow} ${isEmpty}`,
	`${shadow} ${isFull}`,
	`${shadow} ${isPlaced}`,
	`${shadow} ${isUndestructible}`,
];

const Aside = ({ top = defaultGrid, bottom = defaultGrid, infos, currentPlayer, room, players, gameMaster, score }) => {
	const renderInfos = (infoComponent, props) => {
		if (infoComponent) {
			return (<Infos { ...props } />);
		}

		return (<Grid { ...props } />);
	};
	
	return (
		<div className={ aside }>
			<div className={ content }>
				{
					renderInfos(infos, {
						currentPlayer,
						players,
						gameMaster,
						grid: top.grid,
						room,
						containerStyle,
						tileStyle: tileClasses,
						score,
						player: top.name,
					})
				}
			</div>
			<div className={ content }>
				<Grid grid={ bottom.grid } tileStyle={ tileClasses } containerStyle={ containerStyle } player={ bottom.name }/>
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
	score: PropTypes.object,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Aside));
