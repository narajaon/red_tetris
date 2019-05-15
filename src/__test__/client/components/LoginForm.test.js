import React from 'react';
import { configure, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';

import LoginForm from '../../../client/components/LoginForm';

const middlewares = [
	// thunk,
	// handleSocket(),
	// requestNewPiece(),
];

configure({ adapter: new Adapter() });

function setup(initState, initProps) {
	const mockStore = configureStore(middlewares);
	const store = mockStore(initState);
	const enzymeWrapper = mount(<LoginForm { ...initProps  } { ...initState }/>);

	return {
		initProps,
		store,
		enzymeWrapper,
	};
}

describe('Grid component testing', () => {
	let initState;
	let initProps;

	beforeEach(() => {
		initState = {
		};
		
		initProps = {
			logToGame: jest.fn
		};
	});

	it('renders the restart component', () => {
		const { enzymeWrapper, store } = setup(initState, initProps);
		expect(enzymeWrapper.find('[data-jest="login-form"]')).to.not.be.an('undefined');
	});
});