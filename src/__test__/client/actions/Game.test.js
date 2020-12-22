import {switchPhase} from '../../../client/actions/Game';
import {PHASES} from '../../../client/constants';

jest.mock('../../../client/actions/Grid');
jest.mock('../../../client/actions/Socket');

describe('switchPhase', () => {
	it('should reset player on arrived', () => {
		const dispatch = jest.fn();
		const getState = jest.fn(() => ({ gridReducer: { interval: 42 }, gameReducer: { currentPlayer: 'test' } }));

		switchPhase(PHASES.ARRIVED)(dispatch, getState);
		expect(dispatch).toHaveBeenCalledTimes(4);
	});
});
