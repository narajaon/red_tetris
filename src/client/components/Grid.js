import React from 'react';
import { PropTypes } from 'prop-types';
import Tile from './Tile';

/**
 * TODO:
 * - Change grid for flex
 */
const style = {
	display: 'grid',
	gridTemplateColumns: 'repeat(10, min-content)',
	gridGap: '1px',
};

const Grid = ({ keyPressHandler, grid }) => {
	return (
		<div>
			<div
				tabIndex="0"
				onKeyDown={ keyPressHandler }
				onKeyPress={ keyPressHandler }
				className="grid-wrapper">
				<div className="grid" style={ style }>
					{
						grid.map((elem) => {
							return elem.map((tile, index) => (
								<Tile key={ index } isFull={ tile }/>
							));
						})
					}
				</div>
			</div>
		</div>
	);
};

Grid.propTypes = {
	keyPressHandler: PropTypes.func,
	grid: PropTypes.array,
};

export default Grid;
