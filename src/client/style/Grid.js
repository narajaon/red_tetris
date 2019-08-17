import styled, { css } from 'styled-components';

export const tileStates = [
	// EMPTY
	css`
	    /* background-color: rgba(255,255,255,0.1); */
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
];

export const tileTypes = {
	shadow: css`
		height: 7px;
		width: 7px;
	    background: none;
	`,
	regular: css`
	    height: 20px;
		width: 20px;
	    background: none;
	`,
};
