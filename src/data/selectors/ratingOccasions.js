import { createSelector } from 'reselect';

export const getRatingOccasions = state => state.players.entities;

export const getRatingOccasionsAsList = createSelector(
	getRatingOccasions,
	ratingOccasions => ratingOccasions.toList(),
);

export const getSingleRatingOccasion = createSelector(
	getRatingOccasions,
	ratingOccasionId,
	(ratingOccasions, ratingOccasionId) => ratingOccasions.get(ratingOccasionId)
);
