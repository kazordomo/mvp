import React from 'react';
import { useSelector } from 'react-redux';

import colors from '../../assets/colors';

import { getSingleRatingOccasion, getRatingOccasionRatings } from '../../data/selectors/ratingOccasions';

import Nav from '../_shared/Nav';
import Container from '../_shared/Container';
import Wrapper from '../_shared/Wrapper';

const RatingOccasion = ({ match }) => {
	/* @todo: redo how we are storing ratings... */
	const ratingOccasion = useSelector(state =>
		getSingleRatingOccasion(state, { id: match.params.id })
	);

	const ratings = useSelector(state =>
		getRatingOccasionRatings(state, { id: match.params.id })
	);

	if (!ratingOccasion) return 'loading';

	return (
		<Container brColor={colors.spacegrayish()}>
			<Nav title="STATISTIK" />
			<Wrapper>
				{ratingOccasion.opponents}
			</Wrapper>
		</Container>
	)
}

export default RatingOccasion;