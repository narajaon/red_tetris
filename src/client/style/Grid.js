import styled, { css } from 'styled-components';
// import background from '../assets/isometric_pixel_flat_0087.png';

export const tileStates = [
	// EMPTY
	css`
		/* background-image: url(${background});
		background-size: contain;
		background-image: no-repeat; */
	`,
	// FULL
	css`
		/* background-image: url(${background}); */
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
];

export const tileTypes = {
	shadow: css`
		height: 10px;
		width: 7px;
		/* background-image: url(${background}); */
	    /* background: none; */
	`,
	regular: css`
	    height: 20px;
		width: 20px;
		/* background-image: url(${background}); */
	    /* background: none; */
	`,
};
