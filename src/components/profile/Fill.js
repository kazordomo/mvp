import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Each rate-value (1, 2, 3) will have its own "pile". The width of the pile will be all the values added together 
// of the type and calculated against the total value of all values of each type added together. 
// valueOfType / totalValue * 100.
// The left-attribute will be the prior "value-type-pile" to fit in the chart-row.

class Fill extends Component {

    state = {
        timeouts: [],
        activateFill: false,
        activateFillText: false,
    }

    componentDidMount() {
        // Make sure we can cancel the animation if the user leaves the comp before the animation is done.
        this.setState({ timeouts: [ 
            setTimeout(() => this.setState({ activateFill: true }), 75),
            setTimeout(() => this.setState({ activateFillText: true }), 1175),
         ] });
    }

    componentWillUnmount() {
        clearTimeout(this.state.timeouts[0]);
        clearTimeout(this.state.timeouts[1]);
    }
    
    render () {
        if (!this.props.fillWidth) return '';
    
        return (
            <FillRow 
                width={this.state.activateFill ? this.props.fillWidth : 0} 
                left={this.props.left} 
                textOpacity={this.state.activateFillText ? 1 : 0}
                brColor={this.props.brColor}
            ><div>{this.props.rateValueLen ? this.props.rateValueLen + 'st' : ''}</div></FillRow>
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

    div {
        opacity: ${props=>props.textOpacity};
        transition: opacity 150ms ease-out;
    }
    
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

export default Fill;