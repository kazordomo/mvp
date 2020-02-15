import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { MdCheckCircle, MdLockOpen } from 'react-icons/md'

import colors from '../../assets/colors';

import selectors from '../../data/selectors'

import { setRating, resetRating } from '../../data/actions/ratings';

import RatingButton from './RatingButton';
import DoneRating from './DoneRating';
import Container from '../_shared/Container';
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

	const players = useSelector(state => selectors.players.getPlayersAsList(state));
	const ratings = useSelector(state => selectors.ratings.getRatings(state));

	const getIsRated = (value, player) => ratings.get(value)?.player === player;

	const handleRate = (value, player) => dispatch(setRating({ value, player }));
	const handleDone = () => { };
	const handleReset = () => dispatch(resetRating());

	return (
		<Container brColor={colors.spacegrayish()}>
			{ratings.size === 3 && <Fade />}
			<DoneRating
				show={ratings.size === 3}
				handleDone={handleDone}
				handleReset={handleReset}
			/>
			<Wrapper>
				{players.map(player => (
					<Row key={player.id}>
						{player.name}
						<Buttons>
							<RatingButton
								value={1}
								disabled={getIsRated(1, player.id)}
								handleRate={() => handleRate(1, player.id)}
							/>
							<RatingButton
								value={2}
								disabled={getIsRated(2, player.id)}
								handleRate={() => handleRate(2, player.id)}
							/>
							<RatingButton
								value={3}
								disabled={getIsRated(3, player.id)}
								handleRate={() => handleRate(3, player.id)}
							/>
						</Buttons>
					</Row>
				))}
			</Wrapper>
		</Container>
	)
}

export default Rating;