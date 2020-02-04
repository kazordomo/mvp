import { Record, Map } from 'immutable';
import RatingOccasion from '../models/ratingOccasion';
import { ratingOccasionTypes } from '../actions/types';

const initialState = new Record(
	{
		entities: new Map(),
	},
	'ratingOccasions',
);

const addRatingOccasions = (state, { payload }) => {
	let { entities } = state;

	payload.forEach(ratingOccasion => {
		entities = entities.set(ratingOccasion.id, new RatingOccasion(ratingOccasion));
	});

	return state.set('entities', entities);
};

const ratingOccasions = (state = initialState(), action) => {
	switch (action.type) {
		case ratingOccasionTypes.SET_ITEMS:
			return addRatingOccasions(state, action);

		default:
			return state;
	}
};

export default ratingOccasions;
