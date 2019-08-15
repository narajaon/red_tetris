import styled, { css } from 'styled-components';

export const tileStates = [
	// EMPTY
	css`
	    background-color: rgba(255,255,255,0.1);
	`,
	// FULL
	css`
	    opacity: 1;
	`,
	// PLACED
	css`
		opacity: 1;
	`,
	// BLOCKED
	css`
	    background:${({ theme }) => theme.colors.secondary};
    	box-shadow: 0 0 10px ${({ theme }) => theme.colors.secondary};
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
		background:${({ theme }) => theme.colors.main};
    	box-shadow: 0 0 10px ${({ theme }) => theme.colors.main};
	`,
};