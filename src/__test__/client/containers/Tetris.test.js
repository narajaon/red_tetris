import React from 'react';
import setup from '../enzymeSetup';
import Tetris from '../../../client/containers/Tetris';
import { fullStore } from '../mocks';
import { PHASES } from '../../../client/constants';

jest.mock('../../../client/style/Tetris', () => ({ initDocStyle: jest.fn() }));

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	// eslint-disable-next-line react/display-name
	connect: (mapStateToProps) => {
		const { connect: actualConnect } = jest.requireActual('react-redux');
		const dummy = () => ({ type: 'dummy' });
		
		return actualConnect(mapStateToProps, {
			resetSocket: jest.fn(dummy),
			listenToPhases: jest.fn(dummy),
		});
	},
}));

jest.mock('react-router-dom', () => ({
	Route() {
		return (<div>A ROUTE</div>);
	},
	Switch({ children }) {
		return (<div>{children}</div>);
	},
	Redirect() {
		return (<div>A REDIRECTION </div>);
	},
	// eslint-disable-next-line react/display-name
	withRouter: (Component) => props => <Component {...props} />
}));

describe('Tetris container', () => {
	const initProps = (override = {}) => ({
		...override,
	});

	it('should render correctly', () => {
		fullStore.gameReducer.phase = PHASES.ARRIVED;
		const { enzymeWrapper } = setup(fullStore, initProps(), Tetris);

		expect(enzymeWrapper).toBeTruthy();
	});
});

