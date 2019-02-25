import React from 'react';
import styled, { keyframes } from 'styled-components';
import colors from '../../utils/colors';
import logo from '../../images/logo.png';
import { pulse } from 'react-animations';

const pulseAnimation =  keyframes`${pulse}`;

const Br = styled.div`
    background-color: ${colors.spacegrayish()};
    position: fixed;
    height: 100%;
    width: 100%;
`

const Logo = styled.div`
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;

    img {
        animation: .8s ${pulseAnimation} infinite;
    }
`

export default () => (
    <Br>
        <Logo src={logo}>
            <img src={logo} />
        </Logo>
    </Br>
)