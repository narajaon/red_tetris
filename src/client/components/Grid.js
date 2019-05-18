import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { debounce } from 'lodash';
import { DEBOUNCE_VAL } from '../constants';

const Tile = ({ style, content }) => {
	return (
		<div
			className={ style[content] }
			data-jest="tile"
		></div>
	);
};

const Grid = ({ keyPressHandler, grid, placed, tileStyle, containerStyle, player }) => {
	const [contentRef, setRef] = useState(null);

	useEffect(() => {
		if (contentRef) {
			contentRef.focus();
		}
	});

	const keyHandler = (handler) => {
		return handler ? debounce(handler, DEBOUNCE_VAL, {
			'leading': true,
			'trailing': false
		}) : () => null;
	};

	return (
		<div>
			<span>{ player }</span>
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
		</div>
	);
};

Grid.propTypes = {
	keyPressHandler: PropTypes.func,
	grid: PropTypes.array,
	tileStyle: PropTypes.array,
	containerStyle: PropTypes.string,
	placed: PropTypes.string,
	player: PropTypes.string,
};

Tile.propTypes = {
	style: PropTypes.array,
	content: PropTypes.number,
};

export default Grid;
