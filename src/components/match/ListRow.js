import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import colors from '../../assets/colors';

import selectors from '../../data/selectors';

import useAnimation from '../hooks/animation';

const Wrapper = styled.div`
	color: #fff;
	margin-bottom: 20px;
	opacity: ${props => props.active ? '1' : '0'};
	transition: opacity 750ms ease-in-out;

	&:last-child {
		margin-bottom: 0;
	}

	a {
		color: #fff;
	}
`;

const Row = styled.div`
`;

const Opponents = styled.div`
	font-size: 20px;
	font-weight: 600;
	line-height: 32px;
`;

const Stat = styled.div`
	margin: 0 0 5px 10px;
	padding-bottom: 4px;
	letter-spacing: 0.4px;
	border-bottom: 1px solid ${colors.grayish()};

	span {
		color: ${colors.orangeish(94)};
		font-weight: 600;
	}
`;

const ListRow = memo(({ match, index }) => {
	const players = useSelector(state =>
		selectors.players.findAll(state)
	);

	const sortedRatings = useSelector(state =>
		selectors.matches.findSortedRatings(state, match.id)
	);

	const isAnimating = useAnimation(75 * index);

	return (
		<Wrapper active={!isAnimating}>
			<Link
				key={match.id}
				to={`/matches/${match.id}`}>
				<Row>
					<Opponents>{match.opponents}</Opponents>
					<Stat>Omgång: <span>{match.round}</span></Stat>
					<Stat>Antal röster: <span>{match.ratings.size}</span></Stat>
					<Stat>Mvp: <span>
						{players.get(sortedRatings.first().player).name}
					</span>
					</Stat>
				</Row>
			</Link>
		</Wrapper>
	)
});

export default ListRow;