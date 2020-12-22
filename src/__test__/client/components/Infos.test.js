import { configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import setup from '../enzymeSetup';
import { player, playerList } from '../mocks';

import Infos from '../../../client/components/Infos';
import { PHASES } from '../../../client/constants';

configure({ adapter: new Adapter() });

describe('Infos component testing', () => {
	let initProps;

	beforeEach(() => {
		initProps = {
			players: playerList,
			currentPlayer: player.name,
			gameMaster: playerList[1],
			phase: PHASES.STARTED,
			room: '42',
			score: player.score
		};
	});

	it('renders N number of players', () => {
		const { enzymeWrapper } = setup({}, initProps, Infos);
		expect(enzymeWrapper).to.not.be.an('undefined');
		expect(enzymeWrapper.find('[data-jest="infos"]')).to.not.be.an('undefined');
		expect(enzymeWrapper.find('[data-jest="infos-other-players"]')).to.have.lengthOf(1);
	});
});
