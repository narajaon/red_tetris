import { configure } from 'enzyme';
import chai, { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { TETRIS } from '../../../client/constants';
import { placePiece } from '../../../client/actions/Grid';

const middlewares = [
	thunk,
	// handleSocket(),
	// requestNewPiece(),
];

chai.config.truncateThreshold = 0;

function setup(state) {
	const mockStore = configureStore(middlewares);

	const initState = state;
	const store = mockStore(initState);

	return {
		store,
	};
}

configure({ adapter: new Adapter() });

describe('Socket.io-client', function() {
	it('should add a place-piece action on piece-request', function() {
		const { store } = setup({});
		const dummyPieces = TETRIS[2];

		store.dispatch(placePiece(dummyPieces));
		expect(store.getActions()[0]).to.eql(placePiece(dummyPieces));
	});
});
