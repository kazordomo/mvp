import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Nav from '../_shared/Nav';

class Rate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pointsGiven: [],
        }
    }

    render() {
        return (
            <div>
                <Nav />
                Rate Screen
            </div>
        )
    }
}

Rate.propTypes = {
    players: PropTypes.object,
}

export default Rate;