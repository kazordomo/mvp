import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md'
import colors from '../../utils/colors';
import Wrapper from '../_shared/Wrapper';
import PointsInfo from '../_shared/PointsInfo';
import PlayerRatingRow from './PlayerRatingRow';

const ActiveRatingOccasion = ({ ratingOccasion, users, players, getProfileId, onClose }) => {
    if (Object.keys(ratingOccasion).length === 0) 
        return (
            <Outer></Outer>
        )

    return (
        <Outer active={true}>
            <MdClose onClick={onClose} />
            <Wrapper>
                <Head>
                    <h2>{ ratingOccasion.opponents }</h2>
                </Head>
                <PointsInfo />
                <PlayerRatings>
                    {
                        Object.keys(ratingOccasion.ratings).length !== 0 ?
                            Object.keys(ratingOccasion.ratings).map((key, i) => {
                                return (
                                    <PlayerRatingRow 
                                        key={key}
                                        ratingFrom={users[key]}
                                        ratings={ratingOccasion.ratings[key]}
                                        players={players}
                                        profileId={getProfileId(users[key].playerNumber)}
                                        pos={i}
                                    />
                                )
                            }) :
                            'Inga röster registrerade.'
                    }
                </PlayerRatings>
            </Wrapper>
        </Outer>
    )
}

const Outer = styled.div`
    background-color: ${colors.darkish()};
    bottom: 0;
    left: 0;
    opacity: ${props=>props.active?'1':'0'};
    overflow-y: auto;
    overflow-x: hidden;
    position: fixed;
    pointer-events: ${props=>props.active?'all':'none'};
    right: 0;
    top: 0;
    transition: 200ms opacity ease-out;

    svg:first-child {
        color: #fff;
        font-size: 30px;
        position: fixed;
        right: 20px;
        top: 40px;
        z-index: 5;
    }
`;

const PlayerRatings = styled.div`
    color: #fff;
    margin-top: 40px;
`;

const Head = styled.div`
    color: #fff;
    height: 75px;
    line-height: 75px;
    padding: 20px 0;
    position: relative;
    h2 {
        margin: 0;
    }
`;

ActiveRatingOccasion.propTypes = {
    ratingOccasion: PropTypes.object,
}

export default ActiveRatingOccasion;