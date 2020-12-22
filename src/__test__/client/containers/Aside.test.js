import React from 'react';
import setup from '../enzymeSetup';
import Aside from '../../../client/containers/Aside';
import { fullStore } from '../mocks';

jest.mock('react-router-dom', () => ({
	// eslint-disable-next-line react/display-name
	withRouter: (Component) => props => <Component {...props} />
}));

describe('Aside Container', () => {
	it('should render correctly', () => {
		const {enzymeWrapper} = setup(fullStore, { infos: false }, Aside);

		expect(enzymeWrapper).toBeTruthy();
		expect(enzymeWrapper.find('[data-jest="aside-info"]')).toHaveLength(0);
	});


	it('should render whitout infos', () => {
		const {enzymeWrapper} = setup(fullStore, { infos: true }, Aside);

		expect(enzymeWrapper.find('[data-jest="aside-info"]')).toHaveLength(1);
	});
});
