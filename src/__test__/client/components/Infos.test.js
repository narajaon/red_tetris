import React from 'react';
import { configure, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';

import Infos from '../../../client/components/Infos';

const middlewares = [
	// thunk,
	// handleSocket(),
	// requestNewPiece(),
];

configure({ adapter: new Adapter() });

function setup(initState, initProps) {
	const mockStore = configureStore(middlewares);
	const store = mockStore(initState);
	const enzymeWrapper = mount(<Infos { ...initProps  } { ...initState }/>);

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
			currentPlayer: 'FOO',
			room: '42',
			players: [{ name: 'coucou' }, { name: 'coco' }],
			gameMaster: null,
			score: {
				lines: 0,
				total: 0,
				garbage: 0,
			}
		};
	
		initProps = {
		};
	});

	it('renders 200 white tiles', () => {
		const { enzymeWrapper } = setup(initState, initProps);
		expect(enzymeWrapper).to.not.be.an('undefined');
		expect(enzymeWrapper.find('[data-jest="infos"]')).to.not.be.an('undefined');
		expect(enzymeWrapper.find('[data-jest="infos-other-players"]')).to.have.lengthOf(2);
	});
});