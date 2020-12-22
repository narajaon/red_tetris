import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../../client/style/theme';

// eslint-disable-next-line react/display-name
const ThemeWrapper = ({ children }) => {
	return (<ThemeProvider theme={theme}>
		{children}
	</ThemeProvider>);
};

export default ThemeWrapper;
