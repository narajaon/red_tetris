import React from 'react';
import { configure, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';

import Infos from '../../../client/components/Infos';
import ThemeWrapper from '../theme';

configure({ adapter: new Adapter() });

function setup(initState, initProps) {
	const mockStore = configureStore([]);
	const store = mockStore(initState);
	const WithTheme = ThemeWrapper(Infos);
	const enzymeWrapper = mount(<WithTheme { ...initProps  } { ...initState }/>);

	return {
		initProps,
		store,
		enzymeWrapper,
	};
}

describe('Infos component testing', () => {
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

	it('renders N number of players', () => {
		const { enzymeWrapper } = setup(initState, initProps);
		expect(enzymeWrapper).to.not.be.an('undefined');
		expect(enzymeWrapper.find('[data-jest="infos"]')).to.not.be.an('undefined');
		expect(enzymeWrapper.find('[data-jest="infos-other-players"]')).to.have.lengthOf(1);
	});
});
