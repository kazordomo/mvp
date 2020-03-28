import { Record, Map } from "immutable";
import User from "../models/user";
import { userTypes } from "../actions/types";

const initialState = new Record(
	{
		entities: new Map(),
	},
	"users"
);

const addUsers = (state, { payload }) => {
	let { entities } = state;

	payload.forEach(user => {
		entities = entities.set(user.id, new User(user));
	});

	return state.set("entities", entities).set("isFetching", false);
};

const users = (state = initialState(), action) => {
	switch (action.type) {
		case userTypes.FETCH_REQUEST:
			return state.set("isFetching", true);
		case userTypes.FETCH_SUCCESS:
			return addUsers(state, action);

		default:
			return state;
	}
};

export default users;
