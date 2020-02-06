import { getAll } from '../../firebase/fetch';

import { userTypes } from './types';

export const setUsers = payload => ({
	type: userTypes.SET_ITEMS,
	payload,
});

export const fetchUsers = () => async dispatch => {
	try {
		const users = [];
		const snapshot = await getAll('users');
		snapshot.forEach(doc => users.push({ id: doc.id, ...doc.data() }));

		dispatch(setUsers(users));
	} catch (err) {
		console.log(err);
	}
};
