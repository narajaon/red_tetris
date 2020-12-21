import React from 'react';
import { configure, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';

import { Grid } from '../../../client/components/Grid';
import { initGrid } from '../../../client/helpers/Grid';

configure({ adapter: new Adapter() });

function setup(initState, initProps) {
	const mockStore = configureStore([]);
	const store = mockStore(initState);
	const enzymeWrapper = mount(<Grid { ...initProps  } />);

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
			grid: initGrid(),
			pieces: null,
		};
	
		initProps = {
			keyPressHandler: jest.fn(),
			grid: initGrid(),
		};
	});

	it('renders 600 white tiles', () => {
		const { enzymeWrapper } = setup(initState, initProps);
		expect(enzymeWrapper).to.not.be.an('undefined');
		expect(enzymeWrapper.find('[data-jest="tile"]')).to.have.lengthOf(600);
	});
});
