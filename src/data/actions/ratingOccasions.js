import { getAll } from '../../firebase/fetch';

import { ratingOccasionTypes } from './types';

export const setRatingOccasions = payload => ({
	type: ratingOccasionTypes.SET_ITEMS,
	payload,
});

export const fetchRatingOccasions = () => async dispatch => {
	try {
		const ratingOccasions = [];
		const snapshot = await getAll('ratingOccasions');
		snapshot.forEach(doc => ratingOccasions.push({ id: doc.id, ...doc.data() }));

		dispatch(setRatingOccasions(ratingOccasions));
	} catch (err) {
		console.log(err);
	}
};
