import { Record, Map } from 'immutable';
import Rating from '../models/rating';
import { ratingTypes } from '../actions/types';

const initialState = new Record(
	{
		entities: new Map(),
	},
	'ratings',
);

const setRating = (state, { payload }) => {
	const { value, player } = payload;
	const prevPlayerRating = Array
		.from(state.entities.values())
		.find(rating => rating.player === player);

	if (prevPlayerRating) {
		state = state.deleteIn(['entities', prevPlayerRating.value]);
	};

	state = state.setIn(['entities', value], new Rating(payload));
	return state;
};

const resetRating = (state) => {
	return state.set('entities', new Map());
}

const ratings = (state = initialState(), action) => {
	switch (action.type) {
		case ratingTypes.SET_ITEM:
			return setRating(state, action);
		case ratingTypes.RESET:
			return resetRating(state, action);
		default:
			return state;
	}
};

export default ratings;