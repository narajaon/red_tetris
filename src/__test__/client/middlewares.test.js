import {PHASES} from '../../client/constants';
import endGame from '../../client/middlewares/endGame';
import forceLogout from '../../client/middlewares/forceLogout';
import handleErrors from '../../client/middlewares/handleErrors';
import handleSocket from '../../client/middlewares/handleSocket';

jest.mock('socket.io-client', () => ({
	connect: () => ({
		emit: jest.fn(() => 'emit'),
		connect: jest.fn(() => 'connect'),
		removeEventListener: jest.fn(() => 'removeEventListener'),
		on: jest.fn(() => 'on'),
	}),
}));

describe('endGame', () => {
	it('should switch phase on overflows', () => {
		const thunk = endGame();
		const dispatch = jest.fn();
		const getState = jest.fn(() => ({ gridReducer: { overflows: true } }));
		const next = jest.fn();

		thunk({ dispatch, getState})(next)({ type: 'test' });
		expect(dispatch).toHaveBeenCalled();
	});
});

describe('forceLogout', () => {
	it('should call next with an error action for wrong phases', () => {
		const thunk = forceLogout();
		const getState = jest.fn(() => ({ gameReducer: { phase: PHASES.ARRIVED } }));
		const next = jest.fn();

		thunk({ getState })(next)({ type: 'test' });
		expect(next).toHaveBeenCalledWith({ type: 'error', message:'Non authorized - force logout' });
	});
});

describe('handleErrors', () => {
	it('should switch to arrived phase on error', () => {
		const thunk = handleErrors();
		const dispatch = jest.fn();
		const next = jest.fn();

		thunk({ dispatch })(next)({ type: 'error' });
		expect(dispatch).toHaveBeenCalledWith({
			event: 'switch-phase',
			emit: true,
			data: {
				phase: PHASES.ARRIVED,
			},
		});
	});
});

describe('handleSocket', () => {
	it('should not call next', () => {
		const thunk = handleSocket();
		const next = jest.fn();
		const getState = jest.fn(() => ({ gameReducer: { currentPlayer: 'toto', room: 1 } }));

		expect(thunk({ getState })(next)({ emit: true, event: 'test' })).toEqual('emit');
		expect(thunk({ getState })(next)({ connect: true, event: 'test' })).toEqual('connect');
		expect(thunk({ getState })(next)({ leave: true, event: 'test' })).toEqual('removeEventListener');
		expect(thunk({ getState })(next)({ event: 'test' })).toEqual('on');
	});

	it('should call next when action is a func or not event', () => {
		const thunk = handleSocket();
		const next = jest.fn();
		const getState = jest.fn(() => ({ gameReducer: { currentPlayer: 'toto', room: 1 } }));

		thunk({ getState })(next)({ type: 'random' });
		expect(next).toHaveBeenCalledTimes(1);
		thunk({ getState })(next)({ type: jest.fn() });
		expect(next).toHaveBeenCalledTimes(2);
	});
});
