import { configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import setup from '../enzymeSetup';

import LoginFormComponent from '../../../client/components/LoginForm';

configure({ adapter: new Adapter() });

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
		const { enzymeWrapper } = setup(initState, initProps, LoginFormComponent);
		expect(enzymeWrapper.find('[data-jest="login-form"]')).to.not.be.an('undefined');
	});
});
