import { expect } from 'chai';

import { Grid } from '../../../client/components/Grid';
import { initGrid } from '../../../client/helpers/Grid';
import setup from '../enzymeSetup';

describe('Grid component testing', () => {
	let initState;
	let initProps;

	beforeEach(() => {
		initState = {
			pieces: null,
		};
	
		initProps = {
			keyPressHandler: jest.fn(),
			grid: initGrid(),
		};
	});

	it('renders 600 white tiles', () => {
		const { enzymeWrapper } = setup(initState, initProps, Grid);
		expect(enzymeWrapper).to.not.be.an('undefined');
		expect(enzymeWrapper.find('[data-jest="tile"]')).to.have.lengthOf(600);
	});
});
