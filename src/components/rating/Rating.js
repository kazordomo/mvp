import React from 'react';
import { useSelector } from 'react-redux';

import { getPlayersAsList } from '../../data/selectors/players';

import RatingRow from './RatingRow';

const Rating = () => {
	const players = useSelector(state => getPlayersAsList(state));

	return (
		<>
			{
				players.map(player => <RatingRow key={player.id} player={player} />)
			}
		</>
	);
}

export default Rating;