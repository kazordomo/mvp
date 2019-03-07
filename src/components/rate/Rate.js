import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { updateById } from '../../utils/fetch';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../utils/colors';
import { MdCheckCircle, MdLock, MdLockOpen } from 'react-icons/md'
import Nav from '../_shared/Nav';
import Fade from '../_shared/Fade'
import Container from '../_shared/Container';
import Wrapper from '../_shared/Wrapper';
import RateRow from './RateRow';
import SubTitle from '../_shared/SubTitle';

class Rate extends Component {

    constructor(props) {
        super(props);

        this.initialState = {
            AMOUNT_OF_RATINGS: 3,
            pointsGiven: [],
            isDoneRating: false,
            redirectToReferrer: false,
        }

        this.state = this.initialState;
    }

    onPlayerRate = (player, point) => {
        try {
            this.setState({ pointsGiven: [...this.state.pointsGiven, { 
                to: player.id, 
                from: this.props.user.id,
                value: point 
            }] });
        } catch(err) {
            console.log(err);
        }
    }
    
    onDoneRating = () => {
        try {
            this.state.pointsGiven.forEach(point => {
                const player = this.props.players.find(player => player.id === point.to);
                const rating = { to: point.to, from: this.props.user.id, value: point.value, };
                // Update the players list to get the new rating calculated in the Leaderboard
                player.ratings.push(rating);
                updateById('users', rating.to, { ratings: player.ratings });
            });
            this.setState({ isDoneRating: true }, this.handleRedirect);
        } catch(err) {
            console.log(err);
        }
    }

    getRating = player =>  {
        const rating =this.state.pointsGiven.find(point => point.to === player.id);
        return rating ? rating : {};
    }
        
    checkIfRateValueIsUsed = rateValue => {
        const rating = this.state.pointsGiven.find(point => point.value === rateValue);
        return rating ? rating : {}
    }

    onReset = () => this.setState(this.initialState);
    // Let the checkmark-animation be done before redirecting.
    handleRedirect = () => setTimeout(() => this.setState({ redirectToReferrer: true }), 1050);
    checkIfAllRatesUsed = () => this.state.pointsGiven.length === this.state.AMOUNT_OF_RATINGS;

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
                    <SubTitle>Klar?</SubTitle>
                </HiddenIcon>
                <Nav title="RÖSTNING" />
                <Wrapper>
                    { this.props.players
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((player, i) => 
                            <RateRow 
                                key={player.id} 
                                onPlayerRate={this.onPlayerRate} 
                                player={player} 
                                pos={i + 1} 
                                rating={this.getRating(player)}
                                checkIfRateValueIsUsed={this.checkIfRateValueIsUsed}
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

Rate.propTypes = {
    players: PropTypes.array,
}

export default Rate;