import React from 'react';
import PropTypes from 'prop-types';
import colors from '../../utils/colors';
import Nav from '../_shared/Nav';
import Container from '../_shared/Container';
import PlayerRow from './PlayerRow';

const Leaderboard = ({ players }) => {

    const sortedPlayers = players.sort((a, b) => b.totalScore - a.totalScore);

    return (
        <Container brColor={colors.navish()}>
            <Nav title="POÄNGLIGA" />
            { sortedPlayers.map((player, i) => (
                <PlayerRow 
                    key={player.name}
                    pos={i + 1}
                    player={player}
                />
            )) }
        </Container>
    )
}

Leaderboard.propTypes = {
    players: PropTypes.array,
}

export default Leaderboard;

