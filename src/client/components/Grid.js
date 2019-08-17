import React, { useEffect, useRef, forwardRef } from 'react';
import { PropTypes } from 'prop-types';
import _ from 'lodash';
import styled, { css } from 'styled-components';

import { tileStates, tileTypes } from '../style/Grid';

const Grid = forwardRef((props, ref) => {
	const { keyPressHandler, grid, placed, player, type } = props;
	console.log('grid', type);

	return (
		<div
			ref={ref}
			tabIndex={ type === 'regular' ? 0 : '' }
			onKeyDown={ keyPressHandler }
			onKeyPress={ keyPressHandler }
		>
			{player && <span>{ player }</span>}
			<StyledGrid
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
});

Grid.displayName = 'Grid';

const StyledTile = styled.div`
	${({ type }) => tileTypes[type]}
	${({ content }) => tileStates[content]}
	box-sizing: border-box;
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
