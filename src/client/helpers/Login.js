export function formIsValid(player, room) { // eslint-disable-line
	const newRoom = Number.parseInt(room);
	const roomIsValid = !(/\D/.test(room)) && (newRoom < 10);
	const nameIsValid = !(/\W/.test(player))  && (player.length < 15);

	if (!roomIsValid || !nameIsValid || !player || !room) {
		return false;
	}

	return true;
}