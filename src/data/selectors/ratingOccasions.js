import { createSelector } from 'reselect';

export const getIsFetching = state => state.ratingOccasions.isFetching;

export const getRatingOccasions = state => state.ratingOccasions.entities;

export const getActiveRatingOccasion = createSelector(
	getRatingOccasions,
	ratingOccasions => ratingOccasions.find(ratingOccasion => ratingOccasion.active)
);

export const getRatingOccasionsAsList = createSelector(
	getRatingOccasions,
	ratingOccasions => ratingOccasions.toList(),
);

export const getSingleRatingOccasion = createSelector(
	getRatingOccasions,
	(_, props) => props.ratingOccasionId,
	(ratingOccasions, ratingOccasionId) => ratingOccasions.get(ratingOccasionId)
);
