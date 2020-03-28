import React from "react";
import { useDispatch, useSelector } from "react-redux";

import colors from "../../assets/colors";

import selectors from "../../data/selectors";

import {
	setRating,
	resetRating,
	ratingsDone,
} from "../../data/actions/ratings";

import RatingRow from "./Row";
import DoneRating from "./DoneRating";
import Container from "../_shared/Container";
import Nav from "../_shared/Nav";
import Wrapper from "../_shared/Wrapper";
import Fade from "../_shared/Fade";

const Rating = () => {
	const dispatch = useDispatch();

	const players = useSelector(state => selectors.players.findAll(state));
	const ratings = useSelector(state => selectors.ratings.findAll(state));

	const handleRate = (value, player) => dispatch(setRating({ value, player }));
	const handleDone = async () => {
		const response = await dispatch(ratingsDone());

		if (response) {
			console.log("redirect to start page");
		} else {
			console.log("error");
		}
	};
	const handleReset = () => dispatch(resetRating());

	const getRatingsWithPlayer = () =>
		Array.from(ratings.values()).map(rating => ({
			value: rating.value,
			player: players.get(rating.player),
		}));

	return (
		<Container brColor={colors.spacegrayish()}>
			<Nav title="RÖSTNING" />
			{ratings.size === 3 && <Fade />}
			<DoneRating
				show={ratings.size === 3}
				ratings={getRatingsWithPlayer()}
				handleDone={handleDone}
				handleReset={handleReset}
			/>
			<Wrapper>
				{players.toList().map((player, i) => (
					<RatingRow
						key={player.id}
						player={player}
						ratings={ratings}
						onRate={handleRate}
						index={i}
					/>
				))}
			</Wrapper>
		</Container>
	);
};

export default Rating;
