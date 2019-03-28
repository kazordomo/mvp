import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Animation from '../hoc/Animation';

const FillText = ({ amount, activeAnimation }) => 
    <Text active={activeAnimation ? true : false}>{amount ? amount + 'st' : ''}</Text>;

const Text = styled.div `
    opacity: ${props=>props.active ? 1 : 0};
    transition: opacity 150ms ease-out;
`
FillText.propTypes = {
    amount: PropTypes.number,
}

export default Animation(FillText, 975);