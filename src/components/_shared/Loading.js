import React from 'react';
import styled from 'styled-components';
import colors from '../../utils/colors';

const Br = styled.div`
    background-color: ${colors.yellowish()};
    position: fixed;
    height: 100%;
    width: 100%;
`

const Logo = styled.div`
    backgroundColor: pink;
    left: 50%;
    top: 50%;
    height: 200px;
    transform: translate(-50%, -50%);
    position: absolute;
    width: 200px;
`

export default () => (
    <Br>
        <Logo>Loading</Logo>
    </Br>
)