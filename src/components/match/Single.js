import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import useAnimation from '../hooks/animation';

import User from '../../data/models/user';
import Player from '../../data/models/player';

import colors from '../../assets/colors';

import selectors from '../../data/selectors';

import Nav from '../_shared/Nav';
import Container from '../_shared/Container';
import Wrapper from '../_shared/Wrapper';
import PointsInfo from '../_shared/PointsInfo';
import SingleRow from './SingleRow';

const Subtitle = styled.div`
	font-size: 20px;
	font-weight: 600;
	line-height: 32px;
`;

const Row = styled.div`
	span {
		font-weight: 500;
	}
`;

const Ranking = styled.div`
	margin-bottom: 20px;
	color: #fff;
	font-weight: 600;
	opacity: ${props => props.active ? 1 : 0};
	transition: 700ms opacity ease-in-out;

	${Row} {
		padding-bottom: 4px;
		margin-top: 5px;
		border-bottom: 1px solid ${colors.grayish()};
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

	const sortedRatings = useSelector(state =>
		selectors.matches.findSortedRatings(state, props.match.params.id)
	);

	const isAnimating = useAnimation();

	const ratingsByUser = match.ratings.groupBy(rating => rating.user).toList();

	const getUserByRating = userId => users.get(userId) || new User();

	const getPlayerByRating = playerId => players.get(playerId) || new Player();

	const topThree = [
		players.get(sortedRatings.get(0)?.player)?.name,
		players.get(sortedRatings.get(1)?.player)?.name,
		players.get(sortedRatings.get(2)?.player)?.name
	]

	return (
		<Container brColor={colors.spacegrayish()}>
			<Nav title="STATISTIK" goBack={props.history.goBack} />
			<Wrapper>
				<PointsInfo />
				<Ranking active={!isAnimating}>
					<Subtitle>Top tre</Subtitle>
					{
						topThree.map((player, i) =>
							<Row key={i}>{i + 1}: <span>{player}</span></Row>
						)
					}
				</Ranking>
				{
					ratingsByUser.map((ratings, i) =>
						<SingleRow
							key={ratings.first().user}
							ratings={ratings}
							user={getUserByRating(ratings.first().user)}
							getPlayer={getPlayerByRating}
							index={i}
						/>
					)
				}
			</Wrapper>
		</Container>
	)
}

export default SingleMatch;