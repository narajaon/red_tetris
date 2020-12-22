import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';

import Tetris from './containers/Tetris';
import rootReducer from './rootReducer';
import handleSocket from './middlewares/handleSocket';
import hijackTranslate from './middlewares/hijackTranlate';
import handleErrors from './middlewares/handleErrors';
import endGame from './middlewares/endGame';
import theme from './style/theme';

// DECOMMENT FOR DEBUGGING PURPOSES
// const logger = currentStore => next => action => {
// 	console.warn('dispatching', action);
// 	let result = next(action);
// 	console.warn('next state', currentStore.getState());
	
// 	return result;
// };
  
// const crashReporter = () => next => action => {
// 	try {
// 		return next(action);
// 	} catch (err) {
// 		console.error('Caught an exception!', err);
// 		throw err;
// 	}
// };

const store = createStore(
	rootReducer,
	applyMiddleware(
		thunk,
		// logger,
		// crashReporter,
		endGame(),
		handleErrors(),
		handleSocket(),
		hijackTranslate(),
	),
);

render(
	<Provider store={ store }>
		<HashRouter>
			<ThemeProvider theme={theme}>
				<Tetris />
			</ThemeProvider>
		</HashRouter>
	</Provider>, document.getElementById('root')
);
