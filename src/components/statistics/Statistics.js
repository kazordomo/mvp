import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../utils/colors'
import { MdArrowDropDown } from 'react-icons/md'
import { arrayToObj } from '../../utils/funcs';
import SubTitle from '../_shared/SubTitle';
import Nav from '../_shared/Nav';
import Container from '../_shared/Container';
import Wrapper from '../_shared/Wrapper';
import PointsInfo from '../_shared/PointsInfo';
import PlayerRatingsRow from './PlayerRatingsRow';

class Statistics extends Component {

    state = {
        ratingsByOccasion: {},
        ratingOccasionsOpen: [],
        playersObj: {},
    }

    componentDidMount() {
        this.setRatingsByOccasion();
    }

    setRatingsByOccasion = () => {
        const objs = {};
        for (let occasion of this.props.ratingOccasions) {
            objs[occasion.id] = { ...occasion, ratings: {} };
            const allOccasionRatings = this.props.players.flatMap(player => {
                if (!player.ratings) return [];
                return player.ratings.filter(rating => rating.ratingOccasionId === occasion.id);
            });

            for (let rating of allOccasionRatings) {
                objs[occasion.id].ratings[rating.fromId] = allOccasionRatings
                    .filter(r => r.fromId == rating.fromId)
                    .sort((a, b) => a.value - b.value);
            }
        }
        // '' will be added to the arr, which is fine. This is only to avoid error/crash
        const latestRatingOccasionId = this.props.ratingOccasions.length ? this.props.ratingOccasions[0].id : '';
        this.setState({ 
            ratingsByOccasion: objs, 
            playersObj: arrayToObj(this.props.players), 
            ratingOccasionsOpen: [ ...this.state.ratingOccasionsOpen, latestRatingOccasionId ] 
        });
    }

    checkIfOpen = ratingOccasionId => this.state.ratingOccasionsOpen.find(id => id === ratingOccasionId);

    onOpenCloseRates = ratingOccasionId => {
        if (this.checkIfOpen(ratingOccasionId))
            this.setState({ ratingOccasionsOpen: [...this.state.ratingOccasionsOpen].filter(id => id !== ratingOccasionId) });
        else
            this.setState({ ratingOccasionsOpen: [ ...this.state.ratingOccasionsOpen, ratingOccasionId ] });
    }

    render() {
        const { ratingsByOccasion, playersObj } = this.state;

        return (
            <Container brColor={colors.spacegrayish()}>
                <Nav title="STATISTIK" />
                <PointsInfo />
                <Wrapper>
                    {
                        Object.keys(ratingsByOccasion).map(key => {
                            return (
                                <RatingOccasion key={ ratingsByOccasion[key].id }>
                                    <Info 
                                        onClick={() => this.onOpenCloseRates(ratingsByOccasion[key].id)} 
                                        isOpen={this.checkIfOpen(ratingsByOccasion[key].id)}
                                    >
                                        <SubTitle noMargin>{ ratingsByOccasion[key].opponents }</SubTitle>
                                        <span>{ ratingsByOccasion[key].round }</span>
                                        <MdArrowDropDown />
                                    </Info>
                                    <PlayerRates isOpen={this.checkIfOpen(ratingsByOccasion[key].id)}>
                                        {
                                            Object.keys(ratingsByOccasion[key].ratings).map(playerKey => (
                                                <PlayerRatingsRow 
                                                    key={playerKey}
                                                    ratingFrom={playersObj[playerKey]}
                                                    ratings={ratingsByOccasion[key].ratings[playerKey]}
                                                    players={playersObj}
                                                />
                                            ))
                                        }
                                    </PlayerRates>
                                </RatingOccasion>
                            )
                        })
                    }
                </Wrapper>
            </Container>
        )
    }
}

const RatingOccasion = styled.div`
    margin-bottom: 20px;
`;

const Info = styled.div`
    align-items: center;
    border-bottom: 1px solid #fff;
    color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 0px 5px 5px 5px;
    position: relative;

    svg {
        font-size: 28px;
        left: 50%;
        position: absolute;
        bottom: -22px;
        transform: translateX(-50%) rotate(${props=>props.isOpen?'180deg':'0'});
    }

    span {
        color: #F8B195;
    }
`;

const PlayerRates = styled.div`
    height: ${props=>props.isOpen ? 'auto' : '0px'};
    overflow: hidden;
    position: relative;
`;

Statistics.propTypes = {
    ratingOccasions: PropTypes.array,
}

export default Statistics;