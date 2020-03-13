import React, { memo } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { getFillWidth } from '../../utils';

import useAnimation from '../hooks/animation';

import colors from '../../assets/colors';

import selectors from '../../data/selectors'

const Row = styled.div`
	margin-bottom: 15px;

	&:last-child {
		margin: 0;
	}
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 2px;
`;

const Ratings = styled.div`
	width: ${props => props.width}%;
	display: flex;
	color: #fff;
	border: 1px solid ${colors.grayish()};
`;

const Value = styled.div`
	width: ${props => props.width}%;
	background-color: ${props => props.color};
	text-align: center;
	padding: 3px 0;
	transition: width 350ms cubic-bezier(.36,.36,.56,.86);
`;

const RatingsRow = memo(({ ratings, personId, maxPoint, given, index }) => {
	const isAnimating = useAnimation(75 * index);

	const totalValue = ratings.reduce((a, b) => a + b.value, 0);
	const totalFillWidthPercent = getFillWidth(maxPoint, totalValue);

	const person = useSelector(state =>
		given
			? selectors.players.find(state, personId)
			: selectors.users.find(state, personId)
	);

	const fillColors = [
		colors.pointvalueone(),
		colors.pointvaluetwo(),
		colors.pointvaluethree()
	]

	return (
		<Row width={totalFillWidthPercent}>
			<Header>
				<div>{person.name}</div>
				<div>{totalValue} poäng</div>
			</Header>
			<Ratings>
				{
					Array.from(ratings
						.groupBy(rating => rating.value)
						.entries())
						.map(([key, values]) => {
							return (
								<Value
									key={key}
									width={!isAnimating ? getFillWidth(maxPoint, values.size * key || 0) : 0}
									color={fillColors[key - 1]}
								>
									{values.size}st
								</Value>
							)
						})
				}
			</Ratings>
		</Row>
	)
});

export default RatingsRow;