import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Nav from '../_shared/Nav';

class Rate extends Component {

    constructor(props) {
        super(props);

        this.initialState = {
            pointsGiven: [],
            players: props.players,
        }

        this.state = this.initialState;
    }

    onRatePlayer = player => {
        console.log(player);
    }

    onReset = () => this.setState(this.initialState);

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
    players: PropTypes.array,
}

export default Rate;