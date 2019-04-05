import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MdLock } from 'react-icons/md'
import colors from '../../assets/colors';

const RateButton = ({ rateValue, rated, onPlayerRate, player, getRateButtonColor  }) => {
    return (
        rated.toId ? 
            <CustomButton 
                brColor={getRateButtonColor(rateValue)} 
            >
                <MdLock />
            </CustomButton> :
            <CustomButton 
                brColor={getRateButtonColor(rateValue)} 
                onClick={() => onPlayerRate(player, rateValue)}
            >
                { rateValue }
            </CustomButton>
    );
}

const CustomButton = styled.div`
    align-items: center
    background-color: ${props=>props.isRated ? colors.spacegrayish() : props.brColor};
    display: flex;
    font-size: ${props=>props.isRated ? '24px' : '16px'};
    justify-content: center;
    height: 80px;
    width: 75px;

    svg {
        font-size: 20px;
    }
`;

RateButton.propTypes = {
    rateValue: PropTypes.number,
    rated: PropTypes.object,
    onPlayerRate: PropTypes.func,
    player: PropTypes.object,
    getRateButtonColor: PropTypes.func,
}

export default RateButton;