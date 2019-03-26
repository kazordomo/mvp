import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md'
import colors from '../../utils/colors';
import Wrapper from '../_shared/Wrapper';
import SubTitle from '../_shared/SubTitle';
import PlayerRatingRow from './PlayerRatingRow';

const ActiveRatingOccasion = ({ ratingOccasion, users, players, onClose }) => {
    if (Object.keys(ratingOccasion).length === 0) 
        return (
            <Outer></Outer>
        )

        console.log(ratingOccasion, users);
    return (
        <Outer active={true}>
            <MdClose onClick={onClose} />
            <Wrapper>
                <Inner>
                    <SubTitle noMargin>{ ratingOccasion.opponents }</SubTitle>
                    { Object.keys(ratingOccasion.ratings).map(key => {
                        return (
                            <PlayerRatingRow 
                                key={key}
                                ratingFrom={users[key]}
                                ratings={ratingOccasion.ratings[key]}
                                players={players}
                            />
                        )
                    }) }
                </Inner>
            </Wrapper>
        </Outer>
    )
}

const Outer = styled.div`
    background-color: ${colors.grayish()};
    bottom: 0;
    left: 0;
    opacity: ${props=>props.active?'1':'0'};
    position: fixed;
    pointer-events: ${props=>props.active?'all':'none'};
    right: 0;
    top: 0;
    transition: 200ms opacity ease-out;

    svg:first-child {
        color: #fff;
        font-size: 26px;
        position: absolute;
        right: 15px;
        top: 15px;
    }
`;

const Inner = styled.div`

`;

ActiveRatingOccasion.propTypes = {
    ratingOccasion: PropTypes.object,
}

export default ActiveRatingOccasion;