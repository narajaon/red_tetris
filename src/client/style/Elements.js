import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const StyledButton = styled.button`
	background: rgb(93,93,93);
	border-radius: 3px;
	border: none;
	border-top: 1px solid rgba(181, 181, 181, 0.5);
	color: white;
	width: 100px;
    height: 22px;
    font-size: 14px;

	:hover, :active, :focus {
		background-position: right center;
		background: rgb(28,98,203);
	}
`;
