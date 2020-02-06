import { createSelector } from 'reselect';

export const getUsers = state => state.users.entities;

export const getUsersAsList = createSelector(getUsers, users => users.toList());

export const getUserProfileId = createSelector(
	getUsers,
	(_, props) => props.playerNumber,
	(users, playerNumber) => {
		const user = users.find(user => user.playerNumber === playerNumber);
		return user ? user.id : playerNumber;
	});