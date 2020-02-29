import { Map } from 'immutable';
import { createSelector } from 'reselect';

import Player from '../models/player';

import * as matchSelectors from './matches';

const emptyPlayer = new Player();

export const getIsFetching = state => state.players.isFetching;

export const findAll = state => state.players.entities;

export const find = (state, id) => state.players.entities.get(id) || emptyPlayer;

/* @todo: redo with groupBy */
/* @todo: remove altogether... */
export const findAllRatings = createSelector(
	findAll,
	matchSelectors.findAll,
	(players, matches) => {
		let playerRatingMap = new Map();

		players.toList().forEach(player => {
			const ratings = matches
				.toList()
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

export const findRatings = createSelector(
	matchSelectors.findAll,
	(_, { id }) => id,
	(matches, id) =>
		matches
			.toList()
			.flatMap(match => match.ratings)
			.filter(rating => rating.player === id)
			.groupBy(rating => rating.user)
)