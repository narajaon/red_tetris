import React from 'react';
import setup from '../enzymeSetup';
import Home from '../../../client/containers/Home';
import { fullStore } from '../mocks';
import { PHASES } from '../../../client/constants';

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	// eslint-disable-next-line react/display-name
	connect: (mapStateToProps) => {
		const { connect: actualConnect } = jest.requireActual('react-redux');
		const dummy = () => ({ type: 'dummy' });
		
		return actualConnect(mapStateToProps, {
			keyPressHandler: jest.fn(dummy),
			setupGame: jest.fn(dummy),
			disconnectPlayer: jest.fn(dummy),
			restartHandler: jest.fn(dummy),
			startGame: jest.fn(dummy),
		});
	},
}));

jest.mock('react-router-dom', () => ({
	Redirect() {
		return (<div>A REDIRECTION </div>);
	},
	// eslint-disable-next-line react/display-name
	withRouter: (Component) => props => <Component {...props} history={{location: {}}}/>
}));

describe('Home container', () => {
	const initProps = (override = {}) => ({
		...override,
	});

	it('should render correctly', () => {
		const enzymeWrapper = setup(fullStore, initProps(), Home);

		expect(enzymeWrapper).toBeTruthy();
	});

	it('should render the grid on phase started', () => {
		const {enzymeWrapper} = setup(fullStore, initProps(), Home);

		expect(enzymeWrapper.find('Grid')).toHaveLength(1);
	});

	it('should render restart', () => {
		fullStore.gameReducer.phase = PHASES.ENDED;
		const {enzymeWrapper} = setup(fullStore, initProps(), Home);

		expect(enzymeWrapper.find('Restart')).toHaveLength(1);
	});

	it('should render queue', () => {
		fullStore.gameReducer.phase = PHASES.CONNECTED;
		const {enzymeWrapper} = setup(fullStore, initProps(), Home);

		expect(enzymeWrapper.find('Queue')).toHaveLength(1);
	});

	it('should render login', () => {
		fullStore.gameReducer.phase = PHASES.ARRIVED;
		const {enzymeWrapper} = setup(fullStore, initProps(), Home);

		expect(enzymeWrapper.find('Redirect')).toHaveLength(1);
	});
});

