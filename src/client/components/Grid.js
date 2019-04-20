import React from 'react';
import { PropTypes } from 'prop-types';
import Tile from './Tile';

/**
 * TODO:
 * - Change grid for flex
 */
const Grid = (props) => {
	const {
		keyPressHandler,
		grid,
	} = props;

	const style = {
		display: 'grid',
		gridTemplateColumns: 'repeat(10, min-content)',
		gridGap: '1px',
	};

	return (
		<div
			tabIndex="0"
			onKeyDown={ (e) => keyPressHandler(e) }
			onKeyPress={ (e) => keyPressHandler(e) }
			className="grid-wrapper">
			<div style={ style }>
				{
					grid.map((elem) => {
						return elem.map((tile, index) => (
							<Tile key={ index } isFull={ tile }/>
						));
					})
				}
			</div>
		</div>
	);
};

Grid.propTypes = {
	keyPressHandler: PropTypes.func,
	grid: PropTypes.array,
	pieces: PropTypes.object,
};

export default Grid;
