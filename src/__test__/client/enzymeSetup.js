import React from 'react';
import { configure, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import ThemeWrapper from './theme';

configure({ adapter: new Adapter() });

function setup(initState, initProps, Component) {
	const mockStore = configureStore([]);
	const store = mockStore(initState);
	const enzymeWrapper = mount(
		<ThemeWrapper>
			<Provider store={store}>
				<Component { ...initProps  } />
			</Provider>
		</ThemeWrapper>
	);

	return {
		initProps,
		store,
		enzymeWrapper,
	};
}

export default setup;
