import React from 'react';
import { PropTypes } from 'prop-types';
import Tile from './Tile';
import { KEYS } from '../constants';

/**
 * TODO:
 * - Change grid for flex
 */
const Grid = (props) => {
	const {
		placePiece,
		rotatePiece,
		translatePiece,
		startAnimation,
		grid,
		pieces,
		interval,
	} = props;

	// SIDE EFFECTS - NEED REFACTO
	if (!pieces) {
		interval !== null ? clearInterval(interval) : null;
		placePiece();
		startAnimation(setInterval(() => {
			translatePiece({x: 0, y: 1});
		}, 500));
	}

	const style = {
		display: 'grid',
		gridTemplateColumns: 'repeat(10, min-content)',
		gridGap: '1px',
	};

	const keyPressHandler = (event) => {
		switch (event.keyCode) {
		case KEYS.R:
			rotatePiece(pieces);
			break;
		case KEYS.SPACE:
			placePiece();
			break;
		case KEYS.LEFT:
			translatePiece({x: -1, y: 0});
			break;
		case KEYS.RIGHT:
			translatePiece({x: 1, y: 0});
			break;
		case KEYS.DOWN:
			translatePiece({x: 0, y: 1});
			break;
		}
	};

	return (
		<div
			tabIndex="0"
			onKeyDown={ keyPressHandler }
			onKeyPress={ keyPressHandler }
			className="grid-wrapper">
			<div style={ style }>
				{ grid.map((elem) => {
					return elem.map((tile, index) => (
						<Tile key={ index } isFull={ tile }/>
					));
				}) }
			</div>
		</div>
	);
};

Grid.propTypes = {
	placePiece: PropTypes.func,
	rotatePiece: PropTypes.func,
	translatePiece: PropTypes.func,
	startAnimation: PropTypes.func,
	interval: PropTypes.number,
	grid: PropTypes.array,
	pieces: PropTypes.object,
};

export default Grid;
