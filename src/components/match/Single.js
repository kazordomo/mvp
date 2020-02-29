import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import colors from '../../assets/colors';

import selectors from '../../data/selectors';

import Nav from '../_shared/Nav';
import Container from '../_shared/Container';
import Wrapper from '../_shared/Wrapper';
import PointsInfo from '../_shared/PointsInfo';

const Row = styled.div`
	color: #fff;
	margin-bottom: 20px;

	&:last-child {
		margin-bottom: 0;
	}
`;

const Ratings = styled.div`
	display: flex;
	margin-top: 5px;
	text-align: center;

	div {
		padding: 10px;
		flex: 1;

		&:nth-child(1) {
			background-color: ${colors.pointvalueone()};
		}
		&:nth-child(2) {
			background-color: ${colors.pointvaluetwo()};
		}
		&:nth-child(3) {
			background-color: ${colors.pointvaluethree()};
		}
	}
`;

const SingleMatch = props => {
	/* @todo: do we really need to fetch ALL users and ALL players? */
	const match = useSelector(state =>
		selectors.matches.find(state, props.match.params.id));

	const players = useSelector(state =>
		selectors.players.findAll(state)
	)
	const users = useSelector(state =>
		selectors.users.findAll(state)
	)

	const ratingsByUser = match.ratings.groupBy(rating => rating.user).toList();

	const getUserByRating = userId => users.get(userId);

	const getPlayerByRating = playerId => players.get(playerId);

	return (
		<Container brColor={colors.spacegrayish()}>
			<Nav title="STATISTIK" goBack={props.history.goBack} />
			<Wrapper>
				<PointsInfo />
				{
					ratingsByUser.map(ratings =>
						<Row key={ratings.first().user}>
							<div>{getUserByRating(ratings.first().user).name}</div>
							<Ratings>
								{
									ratings.sortBy(rating => rating.value).map(rating =>
										<div key={rating.value}>
											{getPlayerByRating(rating.player).name}
										</div>
									)
								}
							</Ratings>
						</Row>
					)
				}
			</Wrapper>
		</Container>
	)
}

export default SingleMatch;