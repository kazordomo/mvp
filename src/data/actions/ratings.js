import * as firebase from 'firebase';
import { batch } from 'react-redux';

import { ratingTypes } from './types';
import { getDoc } from '../../firebase/fetch';

import { setMatches } from './matches';

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

export const ratingsDone = () => async (dispatch, getState) => {
	const activeMatch = getState().matches.entities.find(match => match.active);
	const ratings = getState().ratings.entities.toList();

	if (!activeMatch) {
		console.log('No active match!');
	}

	if (ratings.size !== 3) {
		console.log('Wrong amount of ratings!');
	}

	try {
		const match = getDoc('match', activeMatch.id);

		ratings.forEach(rating => {
			console.log(rating.toJS());
			match.update({
				ratings: firebase.firestore.FieldValue.arrayUnion(rating.toJS()),
			});
		})

		batch(() => {
			dispatch(setMatches([match]));
			dispatch(resetRating());
		});

		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
};