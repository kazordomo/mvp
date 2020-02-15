import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import selectors from '../../data/selectors'

import { setRating } from '../../data/actions/ratings';

import RatingButton from './RatingButton';

const Row = styled.div`
	margin: 20px 0;
`;

const Buttons = styled.div`
	display: flex;
	flex-direction: row;

	div {
		flex: 1;

		&:first-child {
			background-color: green;
		}

		&:last-child {
			background-color: blue;
		}
	}
`;

const Rating = () => {
	const dispatch = useDispatch();

	const players = useSelector(state => selectors.players.getPlayersAsList(state));
	const ratings = useSelector(state => selectors.ratings.getRatings(state));

	const getIsRated = (value, player) => ratings.get(value)?.player === player;

	const handleRate = (value, player) => dispatch(setRating({ value, player }));

	return (
		<div>
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

			{ratings.size === 3 && <div>Rate</div>}
		</div>
	)
}

export default Rating;