import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { debounce } from 'lodash';
import styled, { css } from 'styled-components';
import uuid from 'uuid';

import { DEBOUNCE_VAL } from '../constants';

const Tile = ({ content, isMain }) => {
	return (
		<StyledTile
			content={content}
			isMain={isMain}
			data-jest="tile"
		></StyledTile>
	);
};

const keyHandler = (handler) => {
	return handler ? debounce(handler, DEBOUNCE_VAL, {
		'leading': true,
		'trailing': false
	}) : () => null;
};

const Grid = ({ keyPressHandler, grid, placed, containerStyle, player }) => {
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
							/>
						));
					})
				}
			</StyledGrid>
		</div>
	);
};


// TODO : transform states into array
const tileStates = {
	isEmpty: css`
	    background-color: rgba(255,255,255,0.1);
	`,
	isFull: css`
	    opacity: 1;
	`,
	isPlaced: css`
		opacity: 1;
	`,
	isBlocked: css`
	    background:${({theme}) => theme.colors.secondary};
    	box-shadow: 0 0 10px ${({theme}) => theme.colors.secondary};
	`,
};

const tileTypes = {
	shadow: css`
		height: 10px;
		width: 10px;
	`,
	regular: css`
	    height: 30px;
		width: 30px;
		background:${({theme}) => theme.colors.main};
    	box-shadow: 0 0 10px ${({theme}) => theme.colors.main};
	`,
};

const StyledTile = styled.div`
	${({ content }) => tileStates[content]}
	${({ isMain }) => isMain ? tileTypes.regular : tileTypes.shadow}
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
