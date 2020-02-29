import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { uniqueArray, findById } from '../../utils';
import colors from '../../assets/colors';
import Nav from '../_shared/Nav';
import Container from '../_shared/Container';
import Wrapper from '../_shared/Wrapper';
import Chart from './Chart';
import SubTitle from '../_shared/SubTitle';
import PointsInfo from '../_shared/PointsInfo';

import selectors from '../../data/selectors';

const Profile = ({ match, history }) => {

	const users = useSelector(state => selectors.users.findAll(state));
	const players = useSelector(state => selectors.players.findAll(state));

	const user = useSelector(state => selectors.users.find(state, match.params.id));
	const player = useSelector(state => selectors.players.find(
		state, { id: user ? user.playerNumber : parseInt(match.params.id) })
	);

	/* @todo: fetch user/users on page-refresh */
	if (!user && !player) return 'loading';

	const convertToRatingObj = (person, ratings) => {
		return {
			name: person.name,
			totalValue: ratings.reduce((total, a) => total += a.value, 0),
			1: ratings.filter(r => r.value === 1),
			2: ratings.filter(r => r.value === 2),
			3: ratings.filter(r => r.value === 3),
		}
	}

	const getEarnedRatings = () => {
		// Only players will be able to have gotten ratings.
		if (!player?.ratings) return [];

		return uniqueArray(player.ratings.map(rating => {
			const allRatingsFromUser =
				player.ratings.filter(r => r.fromId === rating.fromId);
			return convertToRatingObj(findById(users.toList(), rating.fromId), allRatingsFromUser);
		}));
	}

	const getGivenRatings = () =>
		uniqueArray(
			players.toList().map(player =>
				convertToRatingObj(player, player.ratings
					.filter(rating => rating.fromId === user?.id))
			).filter(ratings => ratings.totalValue !== 0)
		);

	const getQuote = () => (
		[
			'Inga poäng - Lira lite bättre.',
			'Inga poäng - Ta hemjobbet.',
			'Inga poäng - På\'t igen',
			'Inga poäng - Det kommer.',
			'Inga pooäng - Dags att vinna andrabollarna.'
		][Math.floor(Math.random() * Math.floor(4))]
	);

	return (
		<Container brColor={colors.spacegrayish()}>
			<Nav title={player ? player.name : user.name} goBack={history.goBack} />
			<Wrapper>
				<PointsInfo />
			</Wrapper>
			<Col margin>
				<Wrapper>
					<SubTitle>Poäng från användare</SubTitle>
					{
						getEarnedRatings().length ?
							<Chart
								title='Poäng från användare'
								ratings={getEarnedRatings()}
								maxPoint={getEarnedRatings()[0].totalValue}
							/>
							: <div>{getQuote()}</div>
					}
				</Wrapper>
			</Col>
			<Col>
				<Wrapper>
					<SubTitle>Utdelade Poäng</SubTitle>
					{
						getGivenRatings().length ?
							<Chart
								title='Poäng från användare'
								ratings={getGivenRatings()}
								maxPoint={getGivenRatings()[0].totalValue}
							/>
							: <div>Inget utdelat än.</div>
					}
				</Wrapper>
			</Col>
		</Container>
	)
}

const Col = styled.div`
    background-color: rgba(0,0,0,0.1);
    margin-bottom: ${props => props.margin ? '20' : '0'}px;
    padding: 20px 0 40px 0;

    div {
        color: #fff;
    }
`;

export default Profile;