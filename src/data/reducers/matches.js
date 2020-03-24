import { Record, Map, List } from 'immutable';
import Match from '../models/match';
import { matchTypes } from '../actions/types';

const initialState = new Record(
	{
		isFetching: false,
		entities: new Map(),
	},
	'matches',
);

const addMatch = (state, { payload }) => {
	let { entities } = state;

	payload.forEach(match => {
		// why is ratings not converted to list??
		const convertedRatings = new List(match.ratings);
		match['ratings'] = convertedRatings;

		entities = entities.set(match.id, new Match(match));
	});

	return state.set('entities', entities).set('isFetching', false);
};

const matches = (state = initialState(), action) => {
	switch (action.type) {
		case matchTypes.FETCH_REQUEST:
			return state.set('isFetching', true);
		case matchTypes.FETCH_SUCCESS:
			return addMatch(state, action);

		default:
			return state;
	}
};

export default matches;
