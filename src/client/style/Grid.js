import styled, { css } from 'styled-components';
// import background from '../assets/isometric_pixel_flat_0087.png';

export const tileStates = [
	// EMPTY
	css`
	`,
	// FULL
	css`
		border: 1px solid ${({ theme }) => theme.colors.main};
	`,
	// PLACED
	css`
    	border: 1px solid ${({ theme }) => theme.colors.secondary};
	`,
	// BLOCKED
	css`
    	border: 1px solid ${({ theme }) => theme.colors.main};
	`,
	css`
    	border: 1px solid ${({ theme }) => theme.colors.lightgrey};
	`,
];

export const tileTypes = {
	shadow: css`
		height: 7px;
		width: 7px;
	`,
	regular: css`
	    height: 20px;
		width: 20px;
	`,
};
