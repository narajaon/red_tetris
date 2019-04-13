import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Tile from '../components/Tile';

/**
 * finds a tile from a given coordinates
 * @param {Array} grid the whole tetris grid
 * @param {Object} param1 x and y of the object to find
 */
const getIndexFromCoordinates = (grid, { x, y }) => {
	let line = -1;
	let col = 0;
	if (y === 0) {
		return x;
	}
	
	return grid.find((elem, index) => {
		col += 1;
		if (index % 10 === 0) {
			line += 1;
			col = 0;
		}

		return line === y && col === x;
	});
};

const Grid = ({ grid, updateGridIndex }) => {
	const style = {
		display: 'grid',
		gridTemplateColumns: 'repeat(10, min-content)',
		gridGap: '1px',
	};
	
	return (
		<div className="grid-wrapper">
			<div style={ style }>
				{ grid.map((elem, index) => <Tile key={ elem.index } isFull={ elem.isFull } index={ index }/>) }
			</div>
			<button onClick={ () => updateGridIndex(4) }>PLACE</button>
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
		updateGridIndex: (index) => {
			dispatch({ type: 'update-grid-index', isFull: 1, index });
		}
	};
};

Grid.propTypes = {
	grid: PropTypes.array,
	updateGridIndex: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
