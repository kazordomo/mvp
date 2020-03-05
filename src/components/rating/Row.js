import React from 'react';
import styled from 'styled-components';

import useAnimation from '../hooks/animation';

import RatingButton from './RatingButton';

const Row = styled.div`
	color: #fff;
	margin: 20px 0;
	transform: translate(${props => props.active ? '0, 0' : '-500px, -35px'});
	transition: transform 200ms ease-in-out;
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

const RatingRow = ({ player, ratings, onRate, index }) => {
	const RATING_VALUES = [1, 2, 3];

	const isAnimating = useAnimation(75 * index);

	const getIsRated = (value, player) => ratings.get(value)?.player === player;

	return (
		<Row key={player.id} active={!isAnimating}>
			{player.name}
			<Buttons>
				{RATING_VALUES.map(value => (
					<RatingButton
						key={value}
						value={value}
						disabled={getIsRated(value, player.id)}
						handleRate={() => onRate(value, player.id)}
					/>
				))}
			</Buttons>
		</Row>
	)
}

export default RatingRow;