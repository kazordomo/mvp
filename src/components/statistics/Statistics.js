import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import { MdGrade } from 'react-icons/md'
import colors from '../../assets/colors'
import { arrayToObj } from '../../utils';
import { getTotalValue } from '../../utils'
import Nav from '../_shared/Nav';
import Container from '../_shared/Container';
import Wrapper from '../_shared/Wrapper';
import ActiveRatingOccasion from './ActiveRatingOccasion/ActiveRatingOccasion';

class Statistics extends Component {

    state = {
        ratingsByOccasion: {},
        playersObj: {},
        usersObj: {},
        activeRatingOccasion: {}
    }

    componentDidMount() {
        this.setRatingsByOccasion();
    }

    setRatingsByOccasion = () => {
        const objs = {};
        // Sorting by "round". The latest game (round >) will be shown as default.
        const sortedRatingOccasions = this.props.ratingOccasions ?
            [...this.props.ratingOccasions].sort((a, b) => b.round - a.round) : [];

        for (let occasion of sortedRatingOccasions) {
            objs[occasion.id] = { ...occasion, ratings: {} };
            const allOccasionRatings = this.props.players
                .map(player => player.ratings)
                .reduce((acc, val) => acc.concat(val), [])
                .filter(rating => rating.ratingOccasionId === occasion.id);

            for (let rating of allOccasionRatings) {
                objs[occasion.id].ratings[rating.fromId] = allOccasionRatings
                    .filter(r => r.fromId === rating.fromId)
                    .sort((a, b) => a.value - b.value);
            }
        }
        this.setState({ 
            ratingsByOccasion: objs, 
            playersObj: arrayToObj(this.props.players),
            usersObj: arrayToObj(this.props.users),
        });
    }

    getPlayersTotalGivenRatings = ratingOccasion => {
        if (ratingOccasion.ratings.length === 0) return [];
        const playersGivenRatings = {};

        for(let key of Object.keys(ratingOccasion.ratings)) {
            for(let rating of ratingOccasion.ratings[key]) {
                // Store as an object with key "value" to keep the structure with getTotalValue-func.
                if (playersGivenRatings[rating.toId]) 
                    playersGivenRatings[rating.toId].push({ value: rating.value });
                else
                    playersGivenRatings[rating.toId] = [{ value: rating.value }];
            }
        }

        return playersGivenRatings;
    }

    calcPlayersTotalRatingValue = ratingOccasion => {
        const ratings = this.getPlayersTotalGivenRatings(ratingOccasion);
        if (ratings.length === 0) return [];
        // Store as an array with [id, totalValue] so that the sorting is easy.
        return Object.keys(ratings)
            .map(key => [ this.state.playersObj[key].name, getTotalValue(ratings[key]) ])
            .sort((a, b) => b[1] - a[1]);
    }

    onRatingOccasion = ratingOccasion => this.setState({ activeRatingOccasion: ratingOccasion });
    onCloseRatingOccasion = () => this.setState({ activeRatingOccasion: {} });
    

    render() {
        const { ratingsByOccasion } = this.state;

        return (
            <Container brColor={colors.spacegrayish()}>
                <Nav title="STATISTIK" />
                    <Wrapper>
                        {
                            Object.keys(ratingsByOccasion).map((key, i) => {
                                return (
                                    <RatingOccasion key={key} pos={i} onClick={() => this.onRatingOccasion(ratingsByOccasion[key])}>
                                        <Head>
                                            <h3>{ ratingsByOccasion[key].opponents }</h3>
                                            <span>Röster: { Object.keys(ratingsByOccasion[key].ratings).length }</span>
                                        </Head>
                                        {
                                            this.calcPlayersTotalRatingValue(ratingsByOccasion[key]).length ?
                                                <RoMVP>
                                                    <MdGrade /> 
                                                    <div>{this.calcPlayersTotalRatingValue(ratingsByOccasion[key])[0][0]}</div>
                                                </RoMVP> : ''
                                        }
                                    </RatingOccasion>
                                )}
                            )
                        }
                    </Wrapper>
                    <ActiveRatingOccasion 
                        ratingOccasion={this.state.activeRatingOccasion} 
                        users={this.state.usersObj}
                        players={this.state.playersObj}
                        calcPlayersTotalRatingValue={this.calcPlayersTotalRatingValue}
                        onClose={this.onCloseRatingOccasion}
                    />
            </Container>
        )
    }
}

const fadeInAnimation = keyframes`${fadeIn}`;

const RatingOccasion = styled.div`
    animation: 1s ${fadeInAnimation};
    background-color: ${colors.grayish(.65)};
    border-radius: 2px;
    box-sizing: border-box;
    box-shadow: 1px 1px 18px 0px rgba(0,0,0,0.75);
    color: #fff;
    margin-bottom: 20px;
    padding: 20px;
    position: relative;
    width: 100%;

    span {
        font-weight: 300;
    }
`;

const Head = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;

    h3 {
        font-size: 24px;
        margin: 0;
        padding: 0;
    }
`;

const RoMVP = styled.div`
    align-items: flex-end;
    color: ${colors.yellowish()};
    display: flex;
    flex-direction: row;
    font-size: 18px;

    svg {
        font-size: 22px;
        margin-right: 10px;
    }
`;

Statistics.propTypes = {
    ratingOccasions: PropTypes.array,
    users: PropTypes.array,
    players: PropTypes.array,
}

export default Statistics;