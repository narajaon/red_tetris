import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';

import Tetris from './containers/TetrisV2';
import * as serviceWorker from './serviceWorker';
import rootReducer from './rootReducer';
import handleSocket from './middlewares/handleSocket';
import hijackTranslate from './middlewares/hijackTranlate';
import handleErrors from './middlewares/handleErrors';
import endGame from './middlewares/endGame';
import theme from './style/theme';

// DECOMMENT FOR DEBUGGING PURPOSES
const logger = currentStore => next => action => {
	console.warn('dispatching', action);
	let result = next(action);
	console.warn('next state', currentStore.getState());
	
	return result;
};
  
const crashReporter = () => next => action => {
	try {
		return next(action);
	} catch (err) {
		console.error('Caught an exception!', err);
		throw err;
	}
};

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
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<Tetris />
			</ThemeProvider>
		</BrowserRouter>
	</Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers:
serviceWorker.unregister();
