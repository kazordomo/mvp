import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import selectors from '../../data/selectors';

const Wrapper = styled.div`
	color: #fff;
	margin-bottom: 20px;

	&:last-child {
		margin-bottom: 0;
	}

	a {
		color: #fff;
	}
`;

const Row = styled.div`
`;

const MatchRow = ({ match }) => {

	// const getSortedValues = match.ratings

	return (
		<Wrapper>
			<Link
				key={match.id}
				to={`/matches/${match.id}`}>
				<Row>
					<div>{match.opponents}</div>
					<div>antal röster: {match.ratings.size}</div>
					<div>mvp</div>
				</Row>
			</Link>
		</Wrapper>
	)
}

export default MatchRow;