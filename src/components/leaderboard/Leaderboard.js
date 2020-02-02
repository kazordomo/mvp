import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import colors from '../../assets/colors';
import { getTotalValue } from '../../utils';
import { fetchPlayers } from '../../data/actions/players';
import Container from '../_shared/Container';
import Nav from '../_shared/Nav';
import LeaderboardRow from './LeaderboardRow';

const Leaderboard = ({ players, getProfileId, fetchPlayers }) => {
	useEffect(() => {
		fetchPlayers();
	}, []);

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
					maxPoint={getTotalValue(sortedPlayers[0].ratings)}
				/>
			))}
		</Container>
	);
};

Leaderboard.propTypes = {
	players: PropTypes.array,
	getProfileId: PropTypes.func,
};

const actions = {
	fetchPlayers,
};

export default connect(null, actions)(Leaderboard);
