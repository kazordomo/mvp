import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RateButton from './RateButton';

class RateRow extends Component {

    state = {
        activateRow: false,
        ratingValues: [1, 2, 3],
    }

    componentDidMount() {
        setTimeout(() => this.setState({ activateRow: true }), 50 * this.props.pos);
    }

    getRowMargin = () => this.state.activateRow ? '0' : '-400px';
    
    getRateButtonColor = value => {
        if (value === 1)
            return 'rgba(232,74,20,1)';
        else if (value === 2)
            return 'rgba(232,94,20,1)';
        else if (value === 3)
            return 'rgba(232,114,20,1)';
        
        return false;
    }

    render() {
        const { player, onPlayerRate, rating, checkIfRateValueIsUsed } = this.props;

        return (
            <Row 
                marginLeft={this.getRowMargin()} 
                brColor={rating ? this.getRateButtonColor(rating.value) : false} 
                used={rating.toId}
            >
                <Name> {player.name} </Name>
                { rating.toId ?
                    <span>{ rating.value }</span> :
                    <RateButtons>
                        {  this.state.ratingValues.map((value, i) => (
                            <RateButton 
                                key={i}
                                rateValue={value} 
                                rated={checkIfRateValueIsUsed(value)}
                                onPlayerRate={onPlayerRate}
                                player={player}
                                getRateButtonColor={this.getRateButtonColor}
                            />
                        )) }
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
    padding: ${props=>props.used ? '2.5px 0' : '0'};
    transition: margin 450ms ease-in-out, padding 150ms ease-out;
    width: 100%;

    span {
        font-size: 22px;
        padding: 0 20px;
    }

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

RateRow.propTypes = {
    player: PropTypes.object,
    onPlayerRate: PropTypes.func,
    rating: PropTypes.object,
    checkIfRateValueIsUsed: PropTypes.func,
}

export default RateRow;