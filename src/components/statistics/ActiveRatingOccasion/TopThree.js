import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getTotalValue } from '../../../utils'
import colors from '../../../assets/colors';
import Animation from '../../hoc/Animation';

const TopThree = ({ ratingOccasion, players, playersTotalRatingValue, activeAnimation }) => {
    // Return empty if less than 3 ratings have been done.
    if (3 > Object.keys(ratingOccasion.ratings).length)
        return '';

    return (
        <TopThreeWrapper active={activeAnimation}>
            <TopThreeRow>
                1: { playersTotalRatingValue[0][0] } <span>{ playersTotalRatingValue[0][1] }p</span>
            </TopThreeRow>
            <TopThreeRow>
                2: { playersTotalRatingValue[1][0] } <span>{ playersTotalRatingValue[1][1] }p</span>
            </TopThreeRow>
            <TopThreeRow>
                3: { playersTotalRatingValue[2][0] } <span>{ playersTotalRatingValue[2][1] }p</span>
            </TopThreeRow>
        </TopThreeWrapper>
    )
}

const TopThreeWrapper = styled.div`
    margin-bottom: 30px;
    opacity: ${props=>props.active ? '1' : '0'};
    transition: opacity 650ms ease-in-out;
`;

const TopThreeRow = styled.div`
    color: #fff;
    margin-bottom: 10px;

    :last-child {
        margin-bottom: 0;
    }

    span {
        color: ${colors.yellowish()};
        font-weight: 700;
    }
`;

TopThree.propTypes = {
    ratingOccasion: PropTypes.object,
    players: PropTypes.object,
}

export default Animation(TopThree);
