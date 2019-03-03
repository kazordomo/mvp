import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { updateById } from '../../utils/fetch';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../utils/colors';
import { MdCheckCircle, MdLock, MdLockOpen } from 'react-icons/md'
import Nav from '../_shared/Nav';
import Container from '../_shared/Container';
import Wrapper from '../_shared/Wrapper';
import RateRow from './RateRow';

class Rate extends Component {

    constructor(props) {
        super(props);

        this.initialState = {
            pointsGiven: [],
            isDoneRating: false,
            redirectToReferrer: false,
        }

        this.state = this.initialState;
    }

    onPlayerRate = (player, point) => {
        try {
            this.setState({ pointsGiven: [...this.state.pointsGiven, { 
                toId: player.id, 
                name: player.name, 
                value: point 
            }] });
        } catch(err) {
            console.log(err);
        }
    }
    onDoneRating = () => {
        try {
            this.state.pointsGiven.forEach(point => {
                const player = this.props.players.find(player => player.id === point.toId);
                const updatedRates = [...player.ratings, { from: this.props.user.id, value: point.value, }];
                // Update the players list to get the new rating calculated in the Leaderboard
                player.ratings.push({ from: this.props.user.id, value: point.value, });
                updateById('users', point.toId, { ratings: updatedRates });
            });
            this.setState({ isDoneRating: true }, this.handleRedirect);
        } catch(err) {
            console.log(err);
        }
    }
    getRating = player => 
        this.state.pointsGiven.find(point => point.name === player.name);
    onReset = () => this.setState(this.initialState);
    handleRedirect = () => setTimeout(() => this.setState({ redirectToReferrer: true }), 1050);
    checkIfAllRatesUsed = () => this.state.pointsGiven.length === 1;

    render() {

        if (this.state.redirectToReferrer)
            return <Redirect to={'/'} />

        return (
            <Container brColor={colors.spacegrayish()}>
                <Fade show={this.state.isDoneRating || this.checkIfAllRatesUsed()}/>
                <HiddenIcon show={this.state.isDoneRating}>
                    <MdCheckCircle color={colors.greenish()} /> : 
                </HiddenIcon>
                <HiddenIcon show={this.checkIfAllRatesUsed() && !this.state.isDoneRating}>
                    <MdLock color='#fff'/>
                </HiddenIcon>
                <Nav title="RÖSTNING" />
                <Wrapper>
                    { this.props.players
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((player, i) => 
                            <RateRow 
                                key={player.name} 
                                onPlayerRate={this.onPlayerRate} 
                                player={player} 
                                pos={i + 1} 
                                rating={this.getRating(player)}    
                            />) 
                    }
                </Wrapper>
                <HandleRatingButtons show={this.state.pointsGiven.length}>
                    <Btn danger onClick={this.onReset}>Reset <MdLockOpen /></Btn>
                    { this.checkIfAllRatesUsed() ? <Btn onClick={this.onDoneRating}>Skicka <MdCheckCircle /></Btn> : '' }
                </HandleRatingButtons>
            </Container>
        )
    }
}

const HandleRatingButtons = styled.div`
    align-items: center;
    bottom: 0px;
    display: ${props=>props.show ? 'flex' : 'none'};
    height: 75px;
    justify-content: center;
    position: fixed;
    pointer-events: none;
    width: 100%;
    z-index: 4;
`;

const Btn = styled.div`
    align-items: center;
    background-color: ${props=>props.danger?colors.redish():colors.greenish()};
    border-radius: 25px;
    bottom: 20px;
    box-shadow: 1px 1px 18px 0px rgba(0,0,0,0.75);
    color: #fff;
    display: flex;
    height: 50px;
    justify-content: center;
    line-height: 50px;
    margin-left: ${props=>props.danger?'0':'20px'};
    pointer-events: all;
    text-align: center;
    width: 150px;

    svg {
        font-size: 18px;
        margin-left: 5px;
    }
`;

const HiddenIcon = styled.div`
    left: ${props=>props.show?'50%':'-60px'};
    top: 50%;
    position: fixed;
    transform: translate(-50%, -50%);
    transition: left 350ms ease-in-out;
    z-index: 3;

    svg {
        font-size: 60px;
    }
`;

const Fade = styled.div`
    background-color: rgba(0,0,0,0.75);
    bottom: 0;
    display: ${props=>props.show ? 'block' : 'none'};
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 2;
`;

Rate.propTypes = {
    players: PropTypes.array,
}

export default Rate;