import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as serviceWorker from './serviceWorker';
import rootReducer from './rootReducer';
import handleSocket from './middlewares/handleSocket';
import hijackTranslate from './middlewares/hijackTranlate';
import startAnimation from './middlewares/startAnimation';
import handleErrors from './middlewares/handleErrors';
import newPlayerConnected from './middlewares/emitNewPlayerConnected';
import requestNewPiece from './middlewares/emitRequestNewPiece';
import requestAuth from './middlewares/emitRequestAuth';
import emitGameStart from './middlewares/emitGameStart';
import Tetris from './containers/Tetris';

const store = createStore(
	rootReducer,
	applyMiddleware(
		thunk,
		handleErrors(),
		handleSocket(),
		newPlayerConnected(),
		startAnimation(),
		hijackTranslate(),
		requestNewPiece(),
		emitGameStart(),
		requestAuth(),
	)
);

// override default body margin and make tetris take available space
Object.assign(document.body.style, {
	margin: '0',
	height: '100%',
});

Object.assign(document.documentElement.style, {
	height: '100%',
});

Object.assign(document.getElementById('root').style, {
	height: '100%',
});

render(
	<Provider store={ store }>
		<BrowserRouter>
			<Tetris />
		</BrowserRouter>
	</Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
