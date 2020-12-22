import {formIsValid} from '../../../client/helpers/Login';

describe('formIsValid', () => {
	it('should return true on valid room and player', () => {
		expect(formIsValid('test', 4)).toBe(true);
	});

	it('should return false on invalid room', () => {
		expect(formIsValid('toto', 42)).toBe(false);
		expect(formIsValid('toto', -1)).toBe(false);
		expect(formIsValid('toto', 'a')).toBe(false);
	});

	it('should return false on invalid player', () => {
		expect(formIsValid('totoewrwrewrwerewr', 42)).toBe(false);
		expect(formIsValid('', 42)).toBe(false);
	});
});
