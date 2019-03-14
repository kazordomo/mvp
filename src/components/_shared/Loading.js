import React from 'react';
import styled, { keyframes } from 'styled-components';
import brImage from '../../images/broddshow.jpeg';
import ImageBr from '../_shared/ImageBr';
import GradientBr from '../_shared/GradientBr';
import logo from '../../images/logo.png';
import { pulse } from 'react-animations';

const pulseAnimation =  keyframes`${pulse}`;

const LoadingContainer = styled.div`
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
    <LoadingContainer>
        <ImageBr url={brImage} />
        <GradientBr />
        <Logo src={logo}>
            <img src={logo} alt='Loading...' />
        </Logo>
    </LoadingContainer>
)