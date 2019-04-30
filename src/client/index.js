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
import newPlayerConnected from './middlewares/emitNewPlayerConnected';
import requestNewPiece from './middlewares/emitRequestNewPiece';
import requestAuth from './middlewares/emitRequestAuth';
import emitGameStart from './middlewares/emitGameStart';


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

const tetrisStyle = {
	width: '500px',
	height: '900px',
	backgroundColor: '#dfffe6',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
};

const tetrisContainerStyle = {
	display: 'flex',
	justifyContent: 'center',
};

render(
	<Provider store={ store }>
		<div className="tetris-container" style={ tetrisContainerStyle }>
			<div className="tetris" style={ tetrisStyle }>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={ App } />
						<Route path="/login" component={ Login } />
					</Switch>
				</BrowserRouter>
			</div>
		</div>
	</Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
