import React from 'react';
import PropTypes from 'prop-types';
import colors from '../../utils/colors';
import Container from '../_shared/Container';
import Nav from '../_shared/Nav';
import LeaderboardRow from './LeaderboardRow';

const Leaderboard = ({ players }) => {

    const getTotalScore = player => player.rates.reduce((total, a) => total += a, 0);
    const sortedPlayers = players.sort((a, b) => getTotalScore(b) - getTotalScore(a));

    return (
        <Container brColor={colors.spacegrayish()}>
            <Nav title="POÄNGLIGA" />
            { sortedPlayers.map((player, i) => (
                <LeaderboardRow 
                    key={player.name}
                    pos={i + 1}
                    player={player}
                    getTotalScore={getTotalScore}
                    maxPoint={getTotalScore(sortedPlayers[0])}
                />
            )) }
        </Container>
    )
}

Leaderboard.propTypes = {
    players: PropTypes.array,
}

export default Leaderboard;

