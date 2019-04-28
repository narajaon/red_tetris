import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import rootReducer from './rootReducer';
import App from './containers/App';
import Login from './containers/Login';

import handleSocket from './middlewares/handleSocket';
import hijackTranslate from './middlewares/hijackTranlate';
import startAnimation from './middlewares/startAnimation';
import handleErrors from './middlewares/handleErrors';
// import newPlayerConnected from './middlewares/newPlayerConnected';
import requestNewPiece from './middlewares/requestNewPiece';
import forceLogout from './middlewares/forceLogout';
import requestAuth from './middlewares/requestAuth';


const store = createStore(
	rootReducer,
	applyMiddleware(
		thunk,
		// forceLogout(),
		handleErrors(),
		handleSocket(),
		// newPlayerConnected(),
		startAnimation(),
		hijackTranslate(),
		requestNewPiece(),
		requestAuth(),
	)
);

render(
	<Provider store={ store }>
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={ App } />
				<Route path="/login" component={ Login } />
			</Switch>
		</BrowserRouter>
	</Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
