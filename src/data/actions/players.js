import { getAll } from '../../firebase/fetch';

import { playerTypes } from './types';

export const setPlayers = payload => ({
	type: playerTypes.SET_ITEMS,
	payload,
});

export const fetchPlayers = () => async dispatch => {
	try {
		const players = [];
		const snapshot = await getAll('players');
		snapshot.forEach(doc => {
			const id = parseInt(doc.id, 10);
			players.push({ id, ...doc.data() });
		});

		dispatch(setPlayers(players));
	} catch (err) {
		// @todo: dispatch error
		console.log(err);
	}
};
