import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Route, BrowserRouter } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import rootReducer from './rootReducer';
import socketMiddleware from './middlewares/handleSocket';
import App from './containers/App';

import hijackTranslate from './middlewares/hijackTranlate';
import startAnimation from './middlewares/startAnimation';
import parseHash from './middlewares/parseHash';
import handleErrors from './middlewares/handleErrors';

const store = createStore(
	rootReducer,
	applyMiddleware(
		thunk,
		hijackTranslate(),
		startAnimation(),
		socketMiddleware(),
		parseHash(),
		handleErrors(),
	)
);

render(
	<Provider store={ store }>
		<BrowserRouter>
			<Route path="/" component={ App }/>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
