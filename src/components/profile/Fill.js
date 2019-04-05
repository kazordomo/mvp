import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Animation from '../hoc/Animation';
import FillText from './FillText';

// Each rate-value (1, 2, 3) will have its own "pile". The width of the pile will be all the values added together 
// of the type and calculated against the total value of all values of each type added together. 
// valueOfType / totalValue * 100.
// The left-attribute will be the prior "value-type-pile" to fit in the chart-row.

class Fill extends Component {
    render () {
        if (!this.props.fillWidth) return '';
    
        return (
            <FillRow 
                width={this.props.activeAnimation ? this.props.fillWidth : 0} 
                left={this.props.left} 
                brColor={this.props.brColor}
            >
                { 
                    (this.props.fillWidth >= 8) ?
                        <FillText amount={this.props.rateValueLen} /> : ''
                }
            </FillRow>
        );
    }
}

const FillRow = styled.div`
    align-items: center;
    background-color: ${props=>props.brColor};
    bottom: 0;
    display: flex;
    height: 100%;
    justify-content: center;
    left: ${props=>props.left}%;
    position: absolute;
    transition: 700ms width ease-in-out;
    width: calc(${props=>props.width}% - 3px);
    
    :last-child {
        border: none;
        width: ${props=>props.width}%;
    }
`;

Fill.propTypes = {
    left: PropTypes.number,
    fillWidth: PropTypes.number,
    maxPoint: PropTypes.number,
    brColor: PropTypes.string,
    rateValueLen: PropTypes.number,
}

export default Animation(Fill);