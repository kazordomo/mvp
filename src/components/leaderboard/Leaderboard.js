import React from 'react';
import PropTypes from 'prop-types';
import colors from '../../utils/colors';
import Container from '../_shared/Container';
import Nav from '../_shared/Nav';
import LeaderboardRow from './LeaderboardRow';

const Leaderboard = ({ players }) => {

    const sortedPlayers = players.sort((a, b) => b.totalScore - a.totalScore);

    return (
        <Container brColor={colors.spacegrayish()}>
            <Nav title="POÄNGLIGA" />
            { sortedPlayers.map((player, i) => (
                <LeaderboardRow 
                    key={player.name}
                    pos={i + 1}
                    player={player}
                    maxPoint={sortedPlayers[0].totalScore}
                />
            )) }
        </Container>
    )
}

Leaderboard.propTypes = {
    players: PropTypes.array,
}

export default Leaderboard;

