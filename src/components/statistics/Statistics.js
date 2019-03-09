import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../utils/colors'
import { arrayToObj, uniqueArray } from '../../utils/funcs';
import Nav from '../_shared/Nav';
import Container from '../_shared/Container';
import Wrapper from '../_shared/Wrapper';
import PlayerRatingsRow from './PlayerRatingsRow';

class Statistics extends Component {

    state = {
        ratingsByOccasion: {},
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
                objs[occasion.id].ratings[rating.fromId] = allOccasionRatings.filter(r => r.fromId == rating.fromId);
            }
        }
        this.setState({ ratingsByOccasion: objs, playersObj: arrayToObj(this.props.players) });
    }

    // TODO: SORT LISTS!!

    render() {
        const { ratingsByOccasion, playersObj } = this.state;

        return (
            <Container brColor={colors.spacegrayish()}>
                <Nav title="STATISTIK" />
                <Wrapper>
                    {
                        Object.keys(ratingsByOccasion).map(key => {
                            return (
                                <RatingOccasion key={ ratingsByOccasion[key].id }>
                                    <Info>
                                        <div>{ ratingsByOccasion[key].opponents }</div>
                                        <div><i>Omgång { ratingsByOccasion[key].round }</i></div>
                                    </Info>

                                    {
                                        Object.keys(ratingsByOccasion[key].ratings).map(playerKey => { 
                                            return (
                                                <PlayerRatingsRow 
                                                    key={playerKey}
                                                    ratingFrom={playersObj[playerKey]}
                                                    ratings={ratingsByOccasion[key].ratings[playerKey]}
                                                    players={playersObj}
                                                />
                                            )
                                        })
                                    }

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
    border-bottom: 1px solid #fff;
    color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
    padding-bottom: 5px;
`;

Statistics.propTypes = {
    ratingOccasions: PropTypes.array,
}

export default Statistics;