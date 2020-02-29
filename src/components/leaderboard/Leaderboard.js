import React from 'react';
import { useSelector } from 'react-redux';

import selectors from '../../data/selectors';

import colors from '../../assets/colors';
import Container from '../_shared/Container';
import Nav from '../_shared/Nav';
import LeaderboardRow from './LeaderboardRow';

const Leaderboard = () => {
	const playerScores = useSelector(state =>
		selectors.players.findAllRatings(state));

	const players = useSelector(state =>
		selectors.players.findAll(state)).sort((a, b) =>
			playerScores.get(a.id) > playerScores.get(b.id) ? -1 : 1
		);

	const maxScore = playerScores.toList().sort().last();

	return (
		<Container brColor={colors.spacegrayish()}>
			<Nav title="POÄNGLIGA" />
			{players.toList().map((player, i) => (
				<LeaderboardRow
					key={player.name}
					pos={i + 1}
					player={player}
					score={playerScores.get(player.id)}
					maxScore={maxScore}
				/>
			))}
		</Container>
	);
};

export default Leaderboard;
