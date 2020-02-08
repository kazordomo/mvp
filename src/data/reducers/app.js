import { Record } from 'immutable';
import { appTypes } from '../actions/types';

const initialState = new Record(
	{
		isGuest: false,
		activeUserId: 0,
	},
	'app',
);

const addActiveUser = (state, { payload }) => ({
	...state, activeUserId: payload
})

const app = (state = initialState, action) => {
	switch (action.type) {
		case appTypes.SET_ACTIVE_USER:
			return addActiveUser(state, action);
		default:
			return state;
	}
}

export default app;