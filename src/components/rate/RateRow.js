import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../utils/colors';

class RateRow extends Component {

    state = {
        activateRow: false,
    }

    componentDidMount() {
        setTimeout(() => this.setState({ activateRow: true }), 50 * this.props.pos);
    }

    getRowMargin = () => this.state.activateRow ? '0' : '-400px';
    
    getRateButtonColor = pos => {
        if (pos === 1)
            return 'rgba(232,74,20,1)';
        else if (pos === 2)
            return 'rgba(232,94,20,1)';
        else if (pos === 3)
            return 'rgba(232,114,20,1)';
        
        return false;
    }

    render() {
        const { player, onPlayerRate, rating } = this.props;
        
        return (
            <Row marginLeft={this.getRowMargin()} brColor={rating ? this.getRateButtonColor(rating.value) : false}>
                <Name>
                    {player.name}
                </Name>
                { 
                    rating ?
                        <RateButton isRated>{ rating.value }</RateButton> :
                        <RateButtons>
                            <RateButton brColor={this.getRateButtonColor(1)} onClick={() => onPlayerRate(player, 1)}>1</RateButton>
                            <RateButton brColor={this.getRateButtonColor(2)} onClick={() => onPlayerRate(player, 2)}>2</RateButton>
                            <RateButton brColor={this.getRateButtonColor(3)} onClick={() => onPlayerRate(player, 3)}>3</RateButton>
                        </RateButtons>

                }
            </Row>
        );
    }
}

const Row = styled.div`
    align-items: center;
    background-color: ${props=>props.brColor ? props.brColor : 'rgba(232,56,20,1)'};
    border-radius: 2px;
    color: #fff;
    display: flex;
    flex-direction: row;
    height: 80px;
    margin-bottom: 10px;
    margin-left: ${props=>props.marginLeft};
    transition: margin 450ms ease-in-out;
    width: 100%;

    :last-child {
        margin-bottom: 55px;
    }
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
    background-color: ${props=>props.isRated ? colors.spacegrayish() : props.brColor};
    display: flex;
    font-size: ${props=>props.isRated ? '24px' : '16px'};
    justify-content: center;
    height: 80px;
    width: 75px;
`;

RateRow.propTypes = {
    player: PropTypes.object,
    onRate: PropTypes.func,
}

export default RateRow;