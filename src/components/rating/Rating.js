import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../assets/colors';

import selectors from '../../data/selectors'

import { setRating, resetRating } from '../../data/actions/ratings';

import RatingButton from './RatingButton';
import DoneRating from './DoneRating';
import Container from '../_shared/Container';
import Nav from '../_shared/Nav';
import Wrapper from '../_shared/Wrapper';
import Fade from '../_shared/Fade';

const Row = styled.div`
	color: #fff;
	margin: 20px 0;
`;

const Buttons = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 5px;

	div {
		flex: 1;
		background-color: rgba(232,94,20,1);

		&:first-child {
			background-color: rgba(232,74,20,1);
		}

		&:last-child {
			background-color: rgba(232,114,20,1);
		}
	}
`;

const Rating = () => {
	const dispatch = useDispatch();

	const RATING_VALUES = [1, 2, 3];

	const players = useSelector(state => selectors.players.findAll(state));
	const ratings = useSelector(state => selectors.ratings.findAll(state));

	const getIsRated = (value, player) => ratings.get(value)?.player === player;

	const handleRate = (value, player) => dispatch(setRating({ value, player }));
	const handleDone = () => console.log('done rating');
	const handleReset = () => dispatch(resetRating());

	const getRatingsWithPlayer = () =>
		Array.from(ratings.values()).map(rating => ({
			value: rating.value, player: players.get(rating.player)
		}))

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
				{players.toList().map(player => (
					<Row key={player.id}>
						{player.name}
						<Buttons>
							{RATING_VALUES.map(value => (
								<RatingButton
									key={value}
									value={value}
									disabled={getIsRated(value, player.id)}
									handleRate={() => handleRate(value, player.id)}
								/>
							))}
						</Buttons>
					</Row>
				))}
			</Wrapper>
		</Container>
	)
}

export default Rating;