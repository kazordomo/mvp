import React from 'react';
import { useSelector } from 'react-redux';

import colors from '../../assets/colors';

import selectors from '../../data/selectors';

import Nav from '../_shared/Nav';
import Container from '../_shared/Container';
import Wrapper from '../_shared/Wrapper';

const SingleMatch = props => {
	/* @todo: do we really need to fetch ALL users and ALL players? */
	const match = useSelector(state =>
		selectors.matches.getSingleMatch(state, { id: props.match.params.id }));

	const players = useSelector(state =>
		selectors.players.getPlayers(state)
	)
	const users = useSelector(state =>
		selectors.users.getUsers(state)
	)

	const ratingsByUser = match.ratings.groupBy(rating => rating.user).toList();

	const getUserByRating = userId => users.get(userId);

	const getPlayerByRating = playerId => players.get(playerId);

	return (
		<Container brColor={colors.spacegrayish()}>
			<Nav title="STATISTIK" />
			<Wrapper>
				{
					ratingsByUser.map(ratings =>
						<div key={ratings.first().user}>
							<div>user: {getUserByRating(ratings.first().user).name}</div>
							{
								ratings.sortBy(rating => rating.value).map(rating =>
									<div key={rating.value}>
										{rating.value} -
										{getPlayerByRating(rating.player).name}
									</div>
								)
							}
						</div>
					)
				}
			</Wrapper>
		</Container>
	)
}

export default SingleMatch;