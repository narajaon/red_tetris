import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../../client/style/theme';

// eslint-disable-next-line react/display-name
const ThemeWrapper = Component => props => {
	return (<ThemeProvider theme={theme}>
		<Component {...props}/>
	</ThemeProvider>);
};

export default ThemeWrapper;
