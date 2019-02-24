import React from 'react';
import PropTypes from 'prop-types';
import colors from '../../utils/colors';
import styled from 'styled-components';
import Nav from '../_shared/Nav';
import PlayerRow from './PlayerRow';

const Leaderboard = ({ players }) => {

    const sortedPlayers = players.sort((a, b) => b.totalScore - a.totalScore);
    // const totalPoints = sortedPlayers.reduce((sum, player) => sum += player.totalScore, 0);

    return (
        <Container>
            <Nav title="POÄNGLIGA" />
            { sortedPlayers.map((player, i) => (
                <PlayerRow 
                    key={player.name}
                    pos={i + 1}
                    player={player}
                    maxPoint={sortedPlayers[0].totalScore}
                />
            )) }
        </Container>
    )
}

const Container = styled.div`
    background-color: rgb(40, 49, 61);
`;

Leaderboard.propTypes = {
    players: PropTypes.array,
}

export default Leaderboard;

