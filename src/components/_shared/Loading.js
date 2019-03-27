import React from 'react';
import styled, { keyframes } from 'styled-components';
import brImage from '../../assets/images/broddshow.jpeg';
import logo from '../../assets/images/logo.png';
import ImageBr from '../_shared/ImageBr';
import GradientBr from '../_shared/GradientBr';
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