import { Record } from 'immutable';
import { appTypes } from '../actions/types';

const initialState = new Record(
	{
		isFetching: false,
		isGuest: false,
		activeUserId: 0,
	},
	'app',
);

const addActiveUser = (state, { payload }) =>
	state.set('activeUserId', payload).set('isFetching', false);

const app = (state = initialState(), action) => {
	switch (action.type) {
		case appTypes.FETCH_USER_REQUEST:
			return state.set('isFetching', true);
		case appTypes.FETCH_USER_SUCCESS:
			return addActiveUser(state, action);
		default:
			return state;
	}
}

export default app;