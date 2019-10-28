import { css } from 'styled-components';

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
		box-shadow: 0px 0px 2px 2px ${({ theme }) => theme.colors.secondary} inset;
	`,
	// BLOCKED
	css`
    	border: 1px solid ${({ theme }) => theme.colors.main};
	`,
	// SHADOW
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
