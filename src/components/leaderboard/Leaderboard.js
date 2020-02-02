import React from 'react';
import { useSelector } from 'react-redux';
import { getPlayersAsList } from '../../data/selectors/players';
import colors from '../../assets/colors';
import { getTotalValue } from '../../utils';
import Container from '../_shared/Container';
import Nav from '../_shared/Nav';
import LeaderboardRow from './LeaderboardRow';

const Leaderboard = ({ getProfileId }) => {
	const players = useSelector(state => getPlayersAsList(state));
	const sortedPlayers = players.sort((a, b) => getTotalValue(b.ratings) - getTotalValue(a.ratings));

	return (
		<Container brColor={colors.spacegrayish()}>
			<Nav title="POÄNGLIGA" />
			{sortedPlayers.map((player, i) => (
				<LeaderboardRow
					key={player.name}
					pos={i + 1}
					player={player}
					profileId={getProfileId(player.number)}
					maxPoint={getTotalValue(sortedPlayers.first().ratings)}
				/>
			))}
		</Container>
	);
};

export default Leaderboard;
