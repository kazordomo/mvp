import { createSelector } from 'reselect';

import { getUsers } from './users';

export const getApp = state => state.app;

export const getActiveUser = createSelector(
	getUsers,
	state => state.app.activeUserId,
	(users, activeUserId) =>
		users.get(activeUserId)
)