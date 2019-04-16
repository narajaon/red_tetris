import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Tile from '../components/Tile';

/**
 * TODO:
 * - Change grid for flex
 */
const Grid = (props) => {
	const { grid, pieces , placePiece, rotatePiece, translatePiece } = props;
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

const mapStateToProps = ({ gridReducer }) => {
	const { grid, pieces } = gridReducer;
	
	return {
		grid,
		pieces,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		placePiece: () => {
			dispatch({ type: 'place-piece' });
		},
		rotatePiece: piece => {
			dispatch({ type: 'rotate-piece', piece });
		},
		translatePiece: (translation) => {
			dispatch({ type: 'translate-piece', translation });
		},
	};
};

Grid.propTypes = {
	grid: PropTypes.array,
	pieces: PropTypes.object,
	placePiece: PropTypes.func,
	rotatePiece: PropTypes.func,
	translatePiece: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
