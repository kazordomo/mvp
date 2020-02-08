import { Record, Map } from 'immutable';
import RatingOccasion from '../models/ratingOccasion';
import { ratingOccasionTypes } from '../actions/types';

const initialState = new Record(
	{
		isFetching: false,
		entities: new Map(),
	},
	'ratingOccasions',
);

const addRatingOccasions = (state, { payload }) => {
	let { entities } = state;

	payload.forEach(ratingOccasion => {
		entities = entities.set(ratingOccasion.id, new RatingOccasion(ratingOccasion));
	});

	return state.set('entities', entities).set('isFetching', false);
};

const ratingOccasions = (state = initialState(), action) => {
	switch (action.type) {
		case ratingOccasionTypes.FETCH_REQUEST:
			return state.set('isFetching', true);
		case ratingOccasionTypes.FETCH_SUCCESS:
			return addRatingOccasions(state, action);

		default:
			return state;
	}
};

export default ratingOccasions;
