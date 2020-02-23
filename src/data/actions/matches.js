import { getAll } from '../../firebase/fetch';

import { matchTypes } from './types';

const requestMatches = () => ({
	type: matchTypes.FETCH_REQUEST
});

const setMatches = payload => ({
	type: matchTypes.FETCH_SUCCESS,
	payload,
});

export const fetchMatches = () => async dispatch => {
	dispatch(requestMatches());

	try {
		const matches = [];
		const snapshot = await getAll('matches');
		snapshot.forEach(doc => matches.push(({ id: doc.id, ...doc.data() })));

		dispatch(setMatches(matches));
	} catch (err) {
		console.log(err);
	}
};