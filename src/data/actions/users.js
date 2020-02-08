import { getAll } from '../../firebase/fetch';

import { userTypes } from './types';

const requestUsers = () => ({
	type: userTypes.FETCH_REQUEST
});

const setUsers = payload => ({
	type: userTypes.FETCH_SUCCESS,
	payload
});

export const fetchUsers = () => async dispatch => {
	dispatch(requestUsers());

	try {
		const users = [];
		const snapshot = await getAll('users');
		snapshot.forEach(doc => users.push({ id: doc.id, ...doc.data() }));

		dispatch(setUsers(users));
	} catch (err) {
		console.log(err);
	}
};
