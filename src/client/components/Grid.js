import React from 'react';
import { PropTypes } from 'prop-types';
import Tile from './Tile';

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
		case 82: // 'r' key
			rotatePiece(pieces);
			break;						
		case 32: // 'sp' key
			placePiece();
			break;			
		case 37: // 'left' arrow
			translatePiece({x: -1, y: 0});
			break;
		case 39: // 'right' arrow
			translatePiece({x: 1, y: 0});
			break;
		case 40: // 'down' arrow
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
