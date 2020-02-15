
import { ratingTypes } from './types';

export const setRating = payload => ({
	type: ratingTypes.SET_ITEM,
	payload,
});

export const resetRating = () => ({
	type: ratingTypes.RESET,
});