import React from 'react';
import { configure, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';

import { LoginFormComponent } from '../../../client/components/LoginForm';
import ThemeWrapper from '../theme';

configure({ adapter: new Adapter() });

function setup(initState, initProps) {
	const mockStore = configureStore([]);
	const store = mockStore(initState);
	const WithTheme = ThemeWrapper(LoginFormComponent);
	const enzymeWrapper = mount(<WithTheme { ...initProps  } { ...initState }/>);

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
		const { enzymeWrapper } = setup(initState, initProps);
		expect(enzymeWrapper.find('[data-jest="login-form"]')).to.not.be.an('undefined');
	});
});
