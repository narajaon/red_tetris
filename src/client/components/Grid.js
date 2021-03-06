import React, { forwardRef } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import { tileStates, tileTypes } from '../style/Grid';

export const Grid = ({ grid, type }) => {
	return (
		<StyledGrid data-jest="grid">
			{grid.map((elem) => {
				return elem.map((tile, index) => (
					<StyledTile
						key={index}
						content={tile}
						type={type}
						data-jest="tile"
					/>
				));
			})}
		</StyledGrid>
	);
};

export const GridWrapper = forwardRef((props, ref) => {
	const { keyPressHandler, grid, type } = props;

	return (
		<StyledWrapper
			ref={ ref }
			tabIndex="0"
			onKeyDown={ keyPressHandler }
			onKeyPress={ keyPressHandler }
		>
			<Grid grid={grid} type={type} />
		</StyledWrapper>
	);
});

const StyledTile = styled.div`
	${({ type }) => tileTypes[type]}
	${({ content }) => tileStates[content]}
	box-sizing: border-box;
`;

const StyledWrapper = styled.div`
	border-bottom: 1px solid ${({ theme }) => theme.colors.main};
`;

const StyledGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(10, min-content);
	width: fit-content;
	border: 1px solid black;
	box-sizing: border-box;
`;

GridWrapper.propTypes = {
	keyPressHandler: PropTypes.func,
	grid: PropTypes.array,
	tileStyle: PropTypes.array,
	containerStyle: PropTypes.string,
	placed: PropTypes.string,
	player: PropTypes.string,
};

GridWrapper.displayName = 'GridWrapper';
