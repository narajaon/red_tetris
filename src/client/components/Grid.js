import React, { useEffect, useState, useCallback } from 'react';
import { PropTypes } from 'prop-types';
import _ from 'lodash';
import styled, { css } from 'styled-components';
import uuid from 'uuid';

import { DEBOUNCE_VAL } from '../constants';
import { tileStates, tileTypes } from '../style/Grid';

const keyHandler = (handler) => {
	return handler ? _.debounce(handler, DEBOUNCE_VAL, {
		'leading': true,
		'trailing': false
	}) : () => null;
};

const Grid = (props) => {
	const { keyPressHandler, grid, placed, player, type } = props;

	console.log('grid', props);
	const [contentRef, setRef] = useState(null);

	useEffect(() => {	
		if (contentRef && type === 'regular') {
			contentRef.focus();
		}
	}, []);

	const handler = keyHandler(keyPressHandler);
	const refSetter = useCallback(element => {
		if (type === 'regular') {
			setRef(element);
		}
	}, []);

	return (
		<div>
			{player && <span>{ player }</span>}
			<StyledGrid
				tabIndex={ keyPressHandler ? 0 : '' }
				onKeyDown={ handler }
				onKeyPress={ handler }
				ref={ refSetter }
				data-jest="grid"
			>
				{grid.map((elem) => {
					return elem.map((tile, index) => (
						<StyledTile
							key={type + index}
							content={tile}
							type={type}
							data-jest="tile"
						/>
					));
				})}
			</StyledGrid>
		</div>
	);
};

const StyledTile = styled.div`
	${({ type }) => tileTypes[type]}
	${({ content }) => tileStates[content]}
	box-sizing: border-box;
	border: 1px solid black;
`;

const StyledGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(10, min-content);
	grid-gap: 1px;
	width: fit-content;
	border: 1px solid black;
	box-sizing: border-box;
`;

Grid.propTypes = {
	keyPressHandler: PropTypes.func,
	grid: PropTypes.array,
	tileStyle: PropTypes.array,
	containerStyle: PropTypes.string,
	placed: PropTypes.string,
	player: PropTypes.string,
};

export default Grid;
