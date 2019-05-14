import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { debounce } from 'lodash';

const Tile = ({ style, content }) => {
	return (
		<div
			className={ style[content] }
			data-jest="tile"
		></div>
	);
};

const Grid = ({ keyPressHandler, grid, placed, tileStyle, containerStyle }) => {
	const [contentRef, setRef] = useState(null);

	useEffect(() => {
		if (contentRef) {
			contentRef.focus();
		}
	});

	const keyHandler = (handler) => {
		return handler ? debounce(handler, 100, {
			'leading': true,
			'trailing': false
		}) : () => null;
	};

	return (
		<div
			tabIndex={ keyPressHandler ? 0 : '' }
			onKeyDown={ keyHandler(keyPressHandler) }
			onKeyPress={ keyHandler(keyPressHandler) }
			ref={ element => {
				setRef(element);
			}}
			data-jest="grid"
			className={ `${containerStyle} ${placed}` }
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
	tileStyle: PropTypes.array,
	containerStyle: PropTypes.string,
	placed: PropTypes.string,
};

Tile.propTypes = {
	style: PropTypes.array,
	content: PropTypes.number,
};

export default Grid;
