import React from 'react';
import styled, { keyframes } from 'styled-components';
import colors from '../../utils/colors';
import { slideInLeft } from 'react-animations';

export default () => (
    <Info>
        <div>1p: <span></span></div>
        <div>2p: <span></span></div>
        <div>3p: <span></span></div>
    </Info>
);

const slideInLeftAnimation = keyframes`${slideInLeft}`;

const Info = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 30px;
    padding: 0 20px;

    div:nth-child(1) {
        animation: 0.8s ${slideInLeftAnimation};
    }
    div:nth-child(2) {
        animation: 0.6s ${slideInLeftAnimation};
    }
    div:nth-child(3) {
        animation: 0.4s ${slideInLeftAnimation};
    }

    div {
        align-items: center;
        display: flex;
        color: #fff;

        span {
            margin-left: 10px;
        }
        :nth-child(1) span {
            background-color: ${colors.onePoint()};
        }
        :nth-child(2) span {
            background-color: ${colors.twoPoint()};
        }
        :nth-child(3) span {
            background-color: ${colors.threePoint()};
        }
    }

    div span {
        display: block;
        height: 15px;
        width: 50px;
    }
`;