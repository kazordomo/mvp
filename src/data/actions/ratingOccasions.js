import { getAll } from '../../firebase/fetch';

import { ratingOccasionTypes } from './types';

const requestRatingOccasions = () => ({
	type: ratingOccasionTypes.FETCH_REQUEST
});

const setRatingOccasions = payload => ({
	type: ratingOccasionTypes.FETCH_SUCCESS,
	payload,
});

export const fetchRatingOccasions = () => async dispatch => {
	dispatch(requestRatingOccasions());

	try {
		const ratingOccasions = [];
		const snapshot = await getAll('ratingOccasions');
		snapshot.forEach(doc => ratingOccasions.push({ id: doc.id, ...doc.data() }));

		dispatch(setRatingOccasions(ratingOccasions));
	} catch (err) {
		console.log(err);
	}
};
