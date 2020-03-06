import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import User from '../../data/models/user';
import Player from '../../data/models/player';

import colors from '../../assets/colors';

import selectors from '../../data/selectors';

import Nav from '../_shared/Nav';
import Container from '../_shared/Container';
import Wrapper from '../_shared/Wrapper';
import PointsInfo from '../_shared/PointsInfo';
import SingleRow from './SingleRow';

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

	const getUserByRating = userId => users.get(userId) || new User();

	const getPlayerByRating = playerId => players.get(playerId) || new Player();

	return (
		<Container brColor={colors.spacegrayish()}>
			<Nav title="STATISTIK" goBack={props.history.goBack} />
			<Wrapper>
				<PointsInfo />
				<div>top three:</div>
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