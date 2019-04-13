import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Tile from '../components/Tile';

const Grid = ({ grid, placePiece, rotatePiece }) => {
	const style = {
		display: 'grid',
		gridTemplateColumns: 'repeat(10, min-content)',
		gridGap: '1px',
	};

	const tiles = grid.map((elem) => {
		return elem.map((tile, index) => <Tile key={ index } isFull={ tile }/>);
	});

	return (
		<div className="grid-wrapper">
			<div style={ style }>
				{ tiles }
			</div>
			<button onClick={ () => placePiece('T') }>PLACE</button>
			<button onClick={ () => rotatePiece('T') }>ROTATE</button>
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
		placePiece: (piece) => {
			dispatch({ type: 'place-piece', piece });
		},
		rotatePiece: (piece) => {
			dispatch({ type: 'rotate-piece', piece });
		},
	};
};

Grid.propTypes = {
	grid: PropTypes.array,
	placePiece: PropTypes.func,
	rotatePiece: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
