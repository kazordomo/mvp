import React, { memo } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import selectors from '../../data/selectors'

const Row = styled.div`
	margin-bottom: 10px;

	&:last-child {
		margin: 0;
	}
`;

const Ratings = styled.div`
	display: flex;
	color: #fff;

	div {
		margin-right: 10px;
		background-color: black;
		padding: 5px 10px;
	}
`;

const RatingsRow = memo(({ ratings, personId, maxPoint, given }) => {

	const person = useSelector(state =>
		given
			? selectors.players.find(state, personId)
			: selectors.users.find(state, personId)
	);

	const totalValue = ratings.reduce((a, b) => a + b.value, 0);

	return (
		<Row>
			<div>{person.name} - {totalValue}</div>
			<Ratings>
				{
					Array.from(ratings
						.groupBy(rating => rating.value)
						.entries())
						.map(([key, values]) => {
							return (
								<div key={key}>
									{key}: {values.size} stycken
								</div>
							)
						})
				}
			</Ratings>
		</Row>
	)
});

export default RatingsRow;