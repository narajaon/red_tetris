import styled, { css } from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Container = styled.div`
	border: 1px solid ${({ color }) => color || 'black'};
	${({ flexed, align, justify, direction }) => css`
		${flexed ? 'display: flex;' : null}
		align-items: ${align};
		justify-content: ${justify};
		flex-direction: ${direction};
	`}
`;
