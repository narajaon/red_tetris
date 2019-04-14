import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Tile from '../components/Tile';

const Grid = ({ grid, placePiece, rotatePiece, translatePiece }) => {
	const style = {
		display: 'grid',
		gridTemplateColumns: 'repeat(10, min-content)',
		gridGap: '1px',
	};

	const tiles = grid.map((elem) => {
		return elem.map((tile, index) => <Tile key={ index } isFull={ tile }/>);
	});

	const keyPressHandler = (event) => {
		const piece = 'L';
		switch (event.keyCode) {
		case 82: // 'r' key
			rotatePiece();
			break;						
		case 32: // 'sp' key
			placePiece(piece);
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

const mapStateToProps = (state) => {
	return {
		grid: state.grid,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		placePiece: currentPieceName => {
			dispatch({ type: 'place-piece', currentPieceName });
		},
		rotatePiece: piece => {
			dispatch({ type: 'rotate-piece', piece });
		},
		translatePiece: (translationCoord, kick) => {
			dispatch({ type: 'translate-piece', translationCoord, kick });
		},
	};
};

Grid.propTypes = {
	grid: PropTypes.array,
	placePiece: PropTypes.func,
	rotatePiece: PropTypes.func,
	translatePiece: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
