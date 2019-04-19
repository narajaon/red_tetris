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
		startAnimation,
		stopAnimation,
		grid,
		overflows,
		pieces,
		interval,
	} = props;

	if (!pieces && !overflows) {
		interval !== null ? stopAnimation(interval) : null;
		startAnimation();
	} else if (overflows) {
		stopAnimation(interval);
	}

	const style = {
		display: 'grid',
		gridTemplateColumns: 'repeat(10, min-content)',
		gridGap: '1px',
	};

	return (
		<div
			tabIndex="0"
			onKeyDown={ (e) => keyPressHandler(e, pieces) }
			onKeyPress={ (e) => keyPressHandler(e, pieces) }
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
	startAnimation: PropTypes.func,
	stopAnimation: PropTypes.func,
	interval: PropTypes.number,
	grid: PropTypes.array,
	pieces: PropTypes.object,
	overflows: PropTypes.bool,
};

export default Grid;
