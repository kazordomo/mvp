import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { getPlayersAsList } from '../../data/selectors/players';

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
const CustomButton = styled.div`
    align-items: center;
	background-color: red;
    display: flex;
	font-size: 16px;
    justify-content: center;
    height: 80px;
    width: 75px;

    svg {
        font-size: 20px;
    }
`;

const Rating = () => {
	const dispatch = useDispatch();

	const players = useSelector(state => getPlayersAsList(state));

	return players.map(player => (
		<Row key={player.id}>
			{player.name}
			<Buttons>
				<CustomButton>1</CustomButton>
				<CustomButton>2</CustomButton>
				<CustomButton>3</CustomButton>
			</Buttons>
		</Row>
	))
}

export default Rating;