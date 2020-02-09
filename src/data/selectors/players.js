import { createSelector } from 'reselect';

export const getIsFetching = state => state.players.isFetching;

export const getPlayers = state => state.players.entities;

export const getPlayersAsList = createSelector(getPlayers, players => players.toList());

export const getSinglePlayer = createSelector(
	getPlayers,
	(_, { id }) => id,
	(players, id) => players.get(id));
