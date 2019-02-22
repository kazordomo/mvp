import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../_shared/Nav';

const Leaderboard = ({ players }) => {

    const sortedPlayers = players.sort((a, b) => b.totalScore - a.totalScore);

    return (
        <div>
            <Nav />
            { sortedPlayers.map((player, i) => (
                <div key={player.name}>{i + 1}: {player.name} {player.totalScore}</div> 
            )) }
        </div>
    )
}

Leaderboard.propTypes = {
    players: PropTypes.array,
}

export default Leaderboard;

