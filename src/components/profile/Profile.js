import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import selectors from "../../data/selectors";

import colors from "../../assets/colors";

import Nav from "../_shared/Nav";
import Container from "../_shared/Container";
import Wrapper from "../_shared/Wrapper";
import PointsInfo from "../_shared/PointsInfo";
import RatingsRow from "./RatingsRow";

const Section = styled.section`
	background-color: rgba(0, 0, 0, 0.2);
	color: #fff;
	margin: 20px 0px;
	padding: 20px;
	border-radius: 2px;

	&:first-of-type {
		margin-top: 0;
	}

	h2 {
		font-size: 20px;
		margin: 0 0 25px 0;
	}
`;

const Profile = ({ match, history }) => {
	const user = useSelector(state =>
		selectors.users.find(state, match.params.id)
	);

	const player = useSelector(state =>
		selectors.players.find(
			state,
			user.playerNumber || parseInt(match.params.id, 10)
		)
	);

	const userRatingsByPlayer = useSelector(state =>
		selectors.users.findRatings(state, match.params.id)
	).groupBy(rating => rating.player);

	const playerRatingsFromUser = useSelector(state =>
		selectors.players.findRatings(state, {
			id: user?.playerNumber || parseInt(match.params.id),
		})
	).groupBy(rating => rating.user);

	const sortRatings = ratings =>
		ratings
			.toList()
			.sort(
				(ratingsA, ratingsB) =>
					ratingsB.reduce((a, b) => a + b.value, 0) -
					ratingsA.reduce((a, b) => a + b.value, 0)
			);

	const getTotalRatingValues = ratings =>
		ratings
			.toList()
			.map(ratings => ratings.reduce((a, b) => a + b.value, 0))
			.sort();

	return (
		<Container brColor={colors.spacegrayish()}>
			<Nav title={user.name || player.name} goBack={history.goBack} />
			<Wrapper>
				<PointsInfo />
			</Wrapper>
			<Section>
				<h2>Poäng från andra</h2>
				{userRatingsByPlayer.size === 0 && (
					<div>
						<i>Spela bättre för att få röster...</i>
					</div>
				)}
				{sortRatings(userRatingsByPlayer).map((ratings, i) => (
					<RatingsRow
						key={i}
						personId={ratings.first().player}
						ratings={ratings}
						maxPoint={getTotalRatingValues(userRatingsByPlayer).last()}
						given
						index={i}
					/>
				))}
			</Section>
			<Section>
				<h2>Poäng utdelade</h2>
				{playerRatingsFromUser.size === 0 && (
					<div>
						<i>Inga poäng utdelade...</i>
					</div>
				)}
				{sortRatings(playerRatingsFromUser).map((ratings, i) => (
					<RatingsRow
						key={i}
						personId={ratings.first().user}
						ratings={ratings}
						maxPoint={getTotalRatingValues(playerRatingsFromUser).last()}
						index={i}
					/>
				))}
			</Section>
		</Container>
	);
};

export default Profile;
