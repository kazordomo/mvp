import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../_shared/Nav';

const Leaderboard = () => {
    return (
        <Nav />
    )
}

Leaderboard.propTypes = {
    players: PropTypes.object,
}

export default Leaderboard;

