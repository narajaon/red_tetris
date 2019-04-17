import React from 'react';
import { PropTypes } from 'prop-types';
import Tile from './Tile';
import { keys } from '../constants';

/**
 * TODO:
 * - Change grid for flex
 */
const Grid = (props) => {
	const { placePiece, rotatePiece, translatePiece, grid, pieces } = props;

	const style = {
		display: 'grid',
		gridTemplateColumns: 'repeat(10, min-content)',
		gridGap: '1px',
	};

	const tiles = grid.map((elem) => {
		return elem.map((tile, index) => <Tile key={ index } isFull={ tile }/>);
	});
	
	const keyPressHandler = (event) => {
		switch (event.keyCode) {
		case keys.R:
			rotatePiece(pieces);
			break;						
		case keys.SPACE:
			placePiece();
			break;			
		case keys.LEFT:
			translatePiece({x: -1, y: 0});
			break;
		case keys.RIGHT:
			translatePiece({x: 1, y: 0});
			break;
		case keys.DOWN:
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
				{ tiles }
			</div>
		</div>
	);
};

Grid.propTypes = {
	placePiece: PropTypes.func,
	rotatePiece: PropTypes.func,
	translatePiece: PropTypes.func,
	grid: PropTypes.array,
	pieces: PropTypes.object,
};

export default Grid;
