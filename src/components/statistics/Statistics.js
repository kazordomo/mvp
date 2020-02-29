import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import colors from '../../assets/colors';

import { getRatingOccasionsAsList, } from '../../data/selectors/ratingOccasions';
import { findAll } from '../../data/selectors/players';

import Nav from '../_shared/Nav';
import Container from '../_shared/Container';
import Wrapper from '../_shared/Wrapper';

const RatingOccasions = () => {
	const ratingOccasions = useSelector(state => getRatingOccasionsAsList(state));
	const players = useSelector(state => findAll(state));

	const getRatings = ratingOccasionId => players.toList().flatMap(
		player => player.ratings.filter(
			rating => rating.ratingOccasionId === ratingOccasionId
		)
	);

	return (
		<Container brColor={colors.spacegrayish()}>
			<Nav title="STATISTIK" />
			<Wrapper>
				{
					ratingOccasions
						.sort((a, b) => b.round - a.round)
						.map(rating => {
							const ratings = getRatings(rating.id);

							return (
								<Link
									key={rating.id}
									to={`/statistics/${rating.id}`}>
									<div>
										{rating.opponents}
										{ratings.size}
									</div>
								</Link>
							)
						})
				}

			</Wrapper>
		</Container>
	)
}

export default RatingOccasions;