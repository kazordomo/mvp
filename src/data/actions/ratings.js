
import { ratingTypes } from './types';

export const setRating = payload => ({
	type: ratingTypes.SET_ITEM,
	payload,
});