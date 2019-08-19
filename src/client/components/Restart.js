import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import { StyledButton } from '../style/Elements';
import { Container } from '../style/Layouts';

const Restart = ({ restartHandler, quitHandler }) => {
	return (
		<div data-jest="restart">
			<Container flexed direction="column" justify="center">
				<StyledOver>GAME OVER</StyledOver>
				<CustomButton onClick={ restartHandler } autoFocus>RESTART</CustomButton>
				<StyledButton onClick={ quitHandler }>QUIT</StyledButton>
			</Container>
		</div>
	);
};

const StyledOver = styled.div`
	text-align: center;
	margin-bottom: 30px;
`;

const CustomButton = styled(StyledButton)`
	margin-bottom: 5px;
`;

Restart.propTypes = {
	restartHandler: PropTypes.func,
	quitHandler: PropTypes.func,
};

export default Restart;