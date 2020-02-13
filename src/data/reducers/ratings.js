import { Record, Map } from 'immutable';
import Rating from '../models/rating';
import { ratingTypes } from '../actions/types';

const initialState = new Record(
	{
		entities: new Map(),
	},
	'ratings',
);

const setRating = () => { };

const ratings = (state = initialState(), action) => {
	switch (action.type) {
		case ratingTypes.SET_ITEM:
			return setRating(state, action);

		default:
			return state;
	}
};

export default ratings;