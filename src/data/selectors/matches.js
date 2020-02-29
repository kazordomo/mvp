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
