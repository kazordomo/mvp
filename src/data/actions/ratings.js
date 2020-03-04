import * as firebase from 'firebase';

import { ratingTypes } from './types';
import { getDoc } from '../../firebase/fetch';

export const setRating = payload => ({
	type: ratingTypes.SET_ITEM,
	payload,
});

export const resetRating = () => ({
	type: ratingTypes.RESET,
});

export const confirmRatings = payload => ({
	type: ratingTypes.CONFIRM,
	payload,
});

export const ratingsDone = (ratings, matchId) => async dispatch => {
	try {
		const match = getDoc('match', matchId);

		// ??
		match.update({
			ratings: firebase.firestore.FieldValue.arrayUnion(ratings),
		});

	} catch (err) {
		console.log(err);
	}
};