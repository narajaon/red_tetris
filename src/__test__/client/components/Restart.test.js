import React from 'react';
import { configure, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';

import Restart from '../../../client/components/Restart';

const middlewares = [
	// thunk,
	// handleSocket(),
	// requestNewPiece(),
];

configure({ adapter: new Adapter() });

function setup(initState, initProps) {
	const mockStore = configureStore(middlewares);
	const store = mockStore(initState);
	const enzymeWrapper = mount(<Restart { ...initProps  } { ...initState }/>);

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
		};
	});

	it('renders the restart component', () => {
		const { enzymeWrapper } = setup(initState, initProps);
		expect(enzymeWrapper).to.not.be.an('undefined');
		expect(enzymeWrapper.find('[data-jest="restart"]')).to.not.be.an('undefined');
	});
});