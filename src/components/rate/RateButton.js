import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MdLock } from 'react-icons/md'
import colors from '../../utils/colors';

const RateButton = ({ rateValue, rated, onPlayerRate, player  }) => {

    const getRateButtonColor = () => {
        if (rateValue === 1)
            return 'rgba(232,74,20,1)';
        else if (rateValue === 2)
            return 'rgba(232,94,20,1)';
        else if (rateValue === 3)
            return 'rgba(232,114,20,1)';
        
        return false;
    }

    return (
        rated.toId ? 
            <CustomButton 
                brColor={getRateButtonColor()} 
            >
                <MdLock />
            </CustomButton> :
            <CustomButton 
                brColor={getRateButtonColor()} 
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
    player: PropTypes.object
}

export default RateButton;