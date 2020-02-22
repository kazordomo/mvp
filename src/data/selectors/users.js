import { createSelector } from 'reselect';

import User from '../models/user';

import { getMatchesAsList } from './matches';

const emptyUser = new User();

export const getIsFetching = state => state.users.isFetching;

export const getUsers = state => state.users.entities;

export const getUsersAsList = createSelector(getUsers, users => users.toList());

export const getSingleUser = createSelector(
	getUsers,
	(_, { id }) => id,
	(users, id) =>
		users.get(id) || emptyUser
);

export const getUserProfileId = createSelector(
	getUsers,
	(_, props) => props.playerNumber,
	(users, playerNumber) => {
		const user = users.find(user => user.playerNumber === playerNumber);
		return user ? user.id : playerNumber;
	}
);

export const getUserRatings = createSelector(
	getSingleUser,
	getMatchesAsList,
	(user, matches) =>
		matches
			.flatMap(match => match.ratings)
			.filter(rating => rating.user === user.id)
			.groupBy(rating => rating.player)

)