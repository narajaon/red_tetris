import React from 'react';
import setup from '../enzymeSetup';
import Login from '../../../client/containers/Login';
import { fullStore } from '../mocks';
import { PHASES } from '../../../client/constants';

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	// eslint-disable-next-line react/display-name
	connect: (mapStateToProps) => {
		const { connect: actualConnect } = jest.requireActual('react-redux');
		const dummy = () => ({ type: 'dummy' });
		
		return actualConnect(mapStateToProps, {
			logToGame: jest.fn(dummy),
		});
	},
}));

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	Redirect() {
		return (<div>A REDIRECTION </div>);
	},
}));

describe('Login container', () => {
	const initProps = (override = {}) => ({
		...override,
	});

	it('should render correctly', () => {
		fullStore.gameReducer.phase = PHASES.ARRIVED;
		const { enzymeWrapper } = setup(fullStore, initProps(), Login);

		expect(enzymeWrapper).toBeTruthy();
		expect(enzymeWrapper.find('LoginForm')).toHaveLength(1);
	});

	it('should redirect to /', () => {
		fullStore.gameReducer.phase = PHASES.CONNECTED;
		const { enzymeWrapper } = setup(fullStore, initProps(), Login);

		expect(enzymeWrapper.find('Redirect')).toHaveLength(1);
	});
});

