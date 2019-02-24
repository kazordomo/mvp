import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../utils/colors';

class RateRow extends Component {

    state = {
        activateRow: false,
    }

    componentDidMount() {
        setTimeout(() => this.setState({ activateRow: true }), 75 * this.props.pos);
    }

    getRowMargin = () => this.state.activateRow ? '0' : '-1200px';

    render() {
        const { player, onRate } = this.props;
        
        return (
            <Row marginLeft={this.getRowMargin()}>
                <Name>
                    {player.name}
                </Name>
                { 
                    this.props.rating ?
                        <RateButton isRated>{ this.props.rating.point }</RateButton> :
                        <RateButtons>
                            <RateButton v={74} onClick={() => onRate(player, 1)}>1</RateButton>
                            <RateButton v={88} onClick={() => onRate(player, 2)}>2</RateButton>
                            <RateButton v={102} onClick={() => onRate(player, 3)}>3</RateButton>
                        </RateButtons>

                }
            </Row>
        );
    }
}

const Row = styled.div`
    align-items: center;
    background-color: rgba(232,56,20,1);
    border-radius: 2px;
    color: #fff;
    display: flex;
    flex-direction: row;
    height: 80px;
    margin-bottom: 10px;
    margin-left: ${props=>props.marginLeft};
    transition: margin 1000ms ease-in-out;
    width: 100%
`;

const Name = styled.div`
    flex: 2;
    padding: 0 20px;
`;

const RateButtons = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const RateButton = styled.div`
    align-items: center
    background-color: ${props=>props.isRated ? colors.spacegrayish() : `rgba(232,${props.v},20,1)`};
    display: flex;
    justify-content: center;
    height: 80px;
    width: 75px;
`;

RateRow.propTypes = {
    player: PropTypes.object,
    onRate: PropTypes.func,
}

export default RateRow;