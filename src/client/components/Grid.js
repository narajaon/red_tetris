import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { debounce } from 'lodash';
import styled, { css } from 'styled-components';
import uuid from 'uuid';

import { DEBOUNCE_VAL } from '../constants';
import { tileStates, tileTypes } from '../style/Grid';

const Tile = ({ content, type }) => {
	
	return (
		<StyledTile
			content={content}
			type={type}
			data-jest="tile"
		/>
	);
};

const keyHandler = (handler) => {
	return handler ? debounce(handler, DEBOUNCE_VAL, {
		'leading': true,
		'trailing': false
	}) : () => null;
};

const Grid = ({ keyPressHandler, grid, placed, player, type }) => {
	const [contentRef, setRef] = useState(null);

	useEffect(() => {
		if (contentRef) {
			contentRef.focus();
		}
	});

	return (
		<div>
			{player && <span>{ player }</span>}
			<StyledGrid
				tabIndex={ keyPressHandler ? 0 : '' }
				onKeyDown={ keyHandler(keyPressHandler) }
				onKeyPress={ keyHandler(keyPressHandler) }
				ref={ element => {
					setRef(element);
				}}
				data-jest="grid"
			>
				{
					grid.map((elem) => {
						return elem.map(tile => (
							<Tile
								key={ uuid() }
								content={ tile }
								type={ type }
							/>
						));
					})
				}
			</StyledGrid>
		</div>
	);
};

const StyledTile = styled.div`
	${({ type }) => tileTypes[type]}
	${({ content }) => tileStates[content]}
	border: 1px solid black;
`;

const StyledGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(10, min-content);
	grid-gap: 0px;
	border: 1px solid black;
	width: fit-content;
`;

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
	isMain: PropTypes.bool,
};

export default Grid;
