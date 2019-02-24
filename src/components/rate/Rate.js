import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../utils/colors';
import Nav from '../_shared/Nav';
import Container from '../_shared/Container';
import Wrapper from '../_shared/Wrapper';
import RateRow from './RateRow';

class Rate extends Component {

    constructor(props) {
        super(props);

        this.initialState = {
            pointsGiven: [],
            players: props.players,
        }

        this.state = this.initialState;
    }

    onRate = (player, point) => {
        this.setState({ pointsGiven: [...this.state.pointsGiven, { name: player.name, point }] });
    }

    getRating = player => {

        return this.state.pointsGiven.find(point => point.name === player.name);
    }

    onReset = () => this.setState(this.initialState);

    render() {
        return (
            <Container brColor={colors.spacegrayish()}>
                <Nav title="RÖSTNING" />
                <Wrapper>
                    { this.state.players.map((player, i) => 
                        <RateRow 
                            key={player.name} 
                            onRate={this.onRate} 
                            player={player} 
                            pos={i + 1} 
                            rating={this.getRating(player)}    
                        />) }
                </Wrapper>
                <HandleRatingButtons>
                    { this.state.pointsGiven.length ? <Btn danger onClick={this.onReset}>Reset</Btn> : '' }
                    { (this.state.pointsGiven.length === 3) ? <Btn>Skicka</Btn> : '' }
                </HandleRatingButtons>
            </Container>
        )
    }
}

const HandleRatingButtons = styled.div`
    bottom: 20px;
    display: flex;
    justify-content: center;
    position: fixed;
    width: 100%;
`;

const Btn = styled.div`
    background-color: ${props=>props.danger?colors.redish():colors.greenish()};
    border-radius: 25px;
    bottom: 20px;
    box-shadow: 1px 1px 18px 0px rgba(0,0,0,0.75);
    color: #fff;
    height: 50px;
    margin-left: ${props=>props.danger?'0':'20px'};
    line-height: 50px;
    text-align: center;
    width: 150px;
`;

Rate.propTypes = {
    players: PropTypes.array,
}

export default Rate;