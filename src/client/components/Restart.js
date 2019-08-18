import React from 'react';
import { PropTypes } from 'prop-types';
import styled, { css } from 'styled-components';

import { StyledButton } from '../style/Elements';
import { Container } from '../style/Layouts';

const Restart = ({ restartHandler, quitHandler }) => {
	return (
		<div data-jest="restart">
			<Container flexed direction="column" justify="center">
				<StyledOver>GAME OVER</StyledOver>
				<StyledButton onClick={ restartHandler } autoFocus>RESTART</StyledButton>
				<StyledButton onClick={ quitHandler }>QUIT</StyledButton>
			</Container>
		</div>
	);
};

const StyledOver = styled.div`
	text-align: center;
	margin-bottom: 30px;
`;

Restart.propTypes = {
	restartHandler: PropTypes.func,
	quitHandler: PropTypes.func,
};

export default Restart;