import { createSelector } from 'reselect';

export const getPlayers = state => state.players.entities;

export const getPlayersAsList = createSelector(getPlayers, players => players.toList());
