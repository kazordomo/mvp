import { Map } from 'immutable';
import { createSelector } from 'reselect';

import { getMatchesAsList } from './matches';

export const getIsFetching = state => state.players.isFetching;

export const getPlayers = state => state.players.entities;

export const getPlayersAsList = createSelector(getPlayers, players => players.toList());

export const getSinglePlayer = createSelector(
	getPlayers,
	(_, { id }) => id,
	(players, id) => players.get(id));

/* @todo: redo with groupBy */
/* @todo: remove altogether... */
export const getPlayersRatings = createSelector(
	getPlayersAsList,
	getMatchesAsList,
	(players, matches) => {
		let playerRatingMap = new Map();

		players.forEach(player => {
			const ratings = matches
				.flatMap(match => match.ratings)
				.filter(rating => rating.player === player.id)
				.reduce((a, b) => a + b.value, 0)

			playerRatingMap = playerRatingMap.set(
				player.id,
				ratings
			)
		})

		return playerRatingMap;
	}
)

export const getPlayerRatings = createSelector(
	getMatchesAsList,
	(_, { id }) => id,
	(matches, id) =>
		matches
			.flatMap(match => match.ratings)
			.filter(rating => rating.player === id)
			.groupBy(rating => rating.user)
)