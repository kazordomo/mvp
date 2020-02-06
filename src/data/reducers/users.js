import { Record, Map } from 'immutable';
import User from '../models/user';
import { userTypes } from '../actions/types';

const initialState = new Record(
	{
		entities: new Map(),
	},
	'users',
);

const addUsers = (state, { payload }) => {
	let { entities } = state;

	payload.forEach(user => {
		entities = entities.set(user.id, new User(user));
	});

	return state.set('entities', entities);
};

const users = (state = initialState(), action) => {
	switch (action.type) {
		case userTypes.SET_ITEMS:
			return addUsers(state, action);

		default:
			return state;
	}
};

export default users;
