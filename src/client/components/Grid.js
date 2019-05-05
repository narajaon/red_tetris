import React from 'react';
import { PropTypes } from 'prop-types';
// import { isFull } from '../style/grid.module.css';

/**
 * TODO:
 * - Change grid for flex
 */

const Tile = ({ style, content }) => {
	const isFull = {
		backgroundColor: content ? 'red' : 'white',
	};
	
	return (
		<div className={ style } style={ isFull } ></div>
	);
};
	
		
const Grid = ({ keyPressHandler = () => null, grid, tileStyle }) => {
	const style = {
		display: 'grid',
		gridTemplateColumns: 'repeat(10, min-content)',
		gridGap: '1px',
	};

	return (
		<div
			tabIndex="0"
			onKeyDown={ keyPressHandler }
			onKeyPress={ keyPressHandler }
			style={ style }
		>
			{
				grid.map((elem) => {
					return elem.map((tile, index) => (
						<Tile
							key={ index }
							style={ tileStyle }
							content={ tile }
						/>
					));
				})
			}
		</div>
	);
};

Grid.propTypes = {
	keyPressHandler: PropTypes.func,
	grid: PropTypes.array,
	tileStyle: PropTypes.string,
};

Tile.propTypes = {
	style: PropTypes.string,
	content: PropTypes.number,
};

export default Grid;
