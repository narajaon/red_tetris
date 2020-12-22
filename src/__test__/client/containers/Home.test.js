import React from 'react';
import setup from '../enzymeSetup';
import Home, { mapDispatchToProps } from '../../../client/containers/Home';
import { fullStore } from '../mocks';
import { KEYS, PHASES } from '../../../client/constants';
import {rotatePiece, translatePiece} from '../../../client/actions/Grid';

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

describe('Home mapDispatchToProps', () => {
	it('should handle keyPressHandler', () => {
		const dispatch = jest.fn();

		mapDispatchToProps(dispatch).keyPressHandler({ keyCode: KEYS.R });
		expect(dispatch).toBeCalledWith(rotatePiece());
		mapDispatchToProps(dispatch).keyPressHandler({ keyCode: KEYS.LEFT });
		expect(dispatch).toBeCalledWith(translatePiece({x: -1, y: 0}));
		mapDispatchToProps(dispatch).keyPressHandler({ keyCode: KEYS.RIGHT });
		expect(dispatch).toBeCalledWith(translatePiece({x: 1, y: 0}));
		mapDispatchToProps(dispatch).keyPressHandler({ keyCode: KEYS.DOWN });
		expect(dispatch).toBeCalledWith(translatePiece({x: 0, y: 1}));
	});

	it('should handle startGame', () => {
		const dispatch = jest.fn();

		mapDispatchToProps(dispatch).startGame({ keyCode: KEYS.ENTER });
		expect(dispatch).toHaveBeenCalledTimes(1);
	});

	it('should handle restartHandler', () => {
		const dispatch = jest.fn();

		mapDispatchToProps(dispatch).restartHandler();
		expect(dispatch).toHaveBeenCalledTimes(1);
	});

	it('should handle disconnectPlayer', () => {
		const dispatch = jest.fn();

		mapDispatchToProps(dispatch).disconnectPlayer();
		expect(dispatch).toHaveBeenCalledTimes(3);
	});


	it('should handle setupGame', () => {
		const dispatch = jest.fn();

		mapDispatchToProps(dispatch).setupGame();
		expect(dispatch).toHaveBeenCalledTimes(2);
	});
});
