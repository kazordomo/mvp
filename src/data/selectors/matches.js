import { createSelector } from 'reselect';

import Match from '../models/match';

const emptyMatch = new Match();

export const getIsFetching = state => state.matches.isFetching;

export const findAll = state => state.matches.entities;

export const find = (state, id) => state.matches.entities.get(id) || emptyMatch;

export const findActive = createSelector(
	findAll,
	matches => matches.find(match => match.active)
);

export const findRatings = createSelector(
	find,
	match => match.ratings
);

export const findSortedRatings = createSelector(
	findRatings,
	ratings => ratings
		.groupBy(rating => rating.player)
		.map(rating => ({
			player: rating.first().player,
			score: rating.reduce((a, b) => a + b.value, 0)
		}))
		.toList()
		.sort((a, b) => b.score - a.score)
)
