import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';
import socketMiddleware from './middlewares/Socket';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import hijackTranslate from './middlewares/hijackTranlate';
import startAnimation from './middlewares/startAnimation';

const store = createStore(
	rootReducer,
	applyMiddleware(
		thunk,
		hijackTranslate(),
		startAnimation(),
		socketMiddleware(),
	)
);

render(
	<Provider store={ store }>
		<App />
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
