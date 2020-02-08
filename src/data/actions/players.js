import { getAll } from '../../firebase/fetch';

import { playerTypes } from './types';

const requestPlayers = () => ({
	type: playerTypes.FETCH_REQUEST,
})

const setPlayers = payload => ({
	type: playerTypes.FETCH_SUCCESS,
	payload,
});

export const fetchPlayers = () => async dispatch => {
	dispatch(requestPlayers());

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
