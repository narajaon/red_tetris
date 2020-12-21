import React from 'react';
import { configure, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';

import Queue from '../../../client/components/Queue';

const middlewares = [
	// thunk,
	// handleSocket(),
	// requestNewPiece(),
];

configure({ adapter: new Adapter() });

function setup(initState, initProps) {
	const mockStore = configureStore(middlewares);
	const store = mockStore(initState);
	const enzymeWrapper = mount(<Queue { ...initProps  } { ...initState }/>);

	return {
		initProps,
		store,
		enzymeWrapper,
	};
}

describe('Grid component testing', () => {
	let initState;
	let initProps;
	const fakePlayer = { name: 'coucou' };

	beforeEach(() => {
		initState = {
			players: [
				fakePlayer,
				fakePlayer,
				fakePlayer,
			]
		};
	
		initProps = {
		};
	});

	it('renders the restart component', () => {
		const { enzymeWrapper, store } = setup(initState, initProps);
		expect(enzymeWrapper.find('[data-jest="queue"]')).to.not.be.an('undefined');
		expect(enzymeWrapper.find('[data-jest="queue"] div').text()).to.include(
			`${ store.getState().players.length } / 4`);
	});
});
