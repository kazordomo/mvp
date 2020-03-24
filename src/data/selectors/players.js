import { createSelector } from 'reselect';

import Player from '../models/player';

import * as matchSelectors from './matches';

const emptyPlayer = new Player();

export const getIsFetching = state => state.players.isFetching;

export const findAll = state => state.players.entities;

export const find = (state, id) => state.players.entities.get(id) || emptyPlayer;

export const findRatings = createSelector(
	matchSelectors.findAll,
	(_, { id }) => id,
	(matches, id) =>
		matches
			.toList()
			.flatMap(match => match.ratings)
			.filter(rating => rating.player === id)
)

export const findAllRatings = createSelector(
	matchSelectors.findAll,
	(matches, id) =>
		matches
			.toList()
			.flatMap(match => match.ratings)
)
