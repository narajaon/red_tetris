import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Tile from '../components/Tile';

const Grid = ({ grid, updateGridIndex }) => {
	const style = {
		display: 'grid',
		gridTemplateColumns: 'repeat(10, min-content)',
		gridGap: '1px',
	};
	
	return (
		<div className="grid-wrapper">
			<div style={ style }>
				{ grid.map(elem => <Tile key={ elem.index } isFull={ elem.isFull }/>) }
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
