import { createSelector } from 'reselect';

import Match from '../models/match';

const emptyMatch = new Match();

export const getIsFetching = state => state.matches.isFetching;

export const getMatches = state => state.matches.entities;

export const getMatchesAsList = createSelector(getMatches, matches => matches.toList());

export const getSingleMatch = createSelector(
	getMatches,
	(_, { id }) => id,
	(matches, id) => matches.get(id) || emptyMatch);
