import { createSelector } from "reselect";

import User from "../models/user";

import * as matchSelectors from "./matches";

const emptyUser = new User();

export const getIsFetching = state => state.users.isFetching;

export const findAll = state => state.users.entities;

export const find = (state, id) => state.users.entities.get(id) || emptyUser;

export const findRatings = createSelector(
	find,
	matchSelectors.findAll,
	(user, matches) =>
		matches
			.toList()
			.flatMap(match => match.ratings)
			.filter(rating => rating.user === user.id)
);

export const getUserProfileId = createSelector(
	findAll,
	(_, props) => props.playerNumber,
	(users, playerNumber) => {
		const user = users.find(user => user.playerNumber === playerNumber);
		return user ? user.id : playerNumber;
	}
);
