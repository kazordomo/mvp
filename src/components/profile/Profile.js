import React from 'react';
import { useSelector } from 'react-redux';

import selectors from '../../data/selectors';

import colors from '../../assets/colors';

import Nav from '../_shared/Nav';
import Container from '../_shared/Container';
import Wrapper from '../_shared/Wrapper';
import RatingsRow from './RatingsRow';

const Profile = ({ match, history }) => {

	const user = useSelector(state =>
		selectors.users.find(state, match.params.id)
	);

	const userRatings = useSelector(state =>
		selectors.users.findRatings(state, match.params.id)
	);

	const playerRatings = useSelector(state =>
		selectors.players.findRatings(state, { id: user?.playerNumber || parseInt(match.params.id) })
	);

	const getTotalRatingValues = ratings => ratings
		.toList()
		.map(ratings =>
			ratings.reduce((a, b) => a + b.value, 0)
		).sort();

	return (
		<Container brColor={colors.spacegrayish()}>
			<Nav title="Profile" goBack={history.goBack} />
			<Wrapper>
				<div>
					{
						userRatings.toList().map((ratings, i) =>
							<RatingsRow
								key={i}
								personId={ratings.first().player}
								ratings={ratings}
								maxPoint={getTotalRatingValues(userRatings).last()}
								given
							/>
						)
					}
				</div>
				<div>
					{
						playerRatings.toList().map((ratings, i) =>
							<RatingsRow
								key={i}
								personId={ratings.first().user}
								ratings={ratings}
								maxPoint={getTotalRatingValues(playerRatings).last()}
							/>
						)
					}
				</div>
			</Wrapper>
		</Container>
	)
}

export default Profile;