import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../_shared/Nav';

const Leaderboard = ({ players }) => {

    let sortedPlayers = [];
    for (let key in players) {
        sortedPlayers.push([players[key].name, players[key].totalScore]);
    }
    sortedPlayers = sortedPlayers.sort((a, b) => b[1] - a[1]);

    return (
        <div>
            <Nav />
            { sortedPlayers.map((player, i) => (
                <div key={player[0]}>{i + 1}: {player[0]} {player[1]}</div> 
            )) }
        </div>
    )
}

Leaderboard.propTypes = {
    players: PropTypes.object,
}

export default Leaderboard;

