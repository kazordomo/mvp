
import { ratingTypes } from './types';

const setRating = payload => ({
	type: ratingTypes.SET_ITEM,
	payload,
});