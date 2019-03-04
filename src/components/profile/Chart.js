import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../utils/colors';
import { getFillWidth, getTotalValue } from '../../utils/funcs';

class Chart extends Component {

    state = {
        activateFill: false,
        activateFillText: false,
    }

    componentDidMount() {
        setTimeout(() => this.setState({ activateFill: true }), 75);
        setTimeout(() => this.setState({ activateFillText: true }), 1175);
    }
    
    render() {
        const { ratings, maxPoint } = this.props;
        const { activateFill, activateFillText } = this.state;
        
        return (
            <div>
                { ratings.map((rating, i) => {
    
                    // Each rate-value (1, 2, 3) will have its own "pile". The width of the pile will be all the values added together 
                    // of the type and calculated against the total value of all values of each type added together. valueOfType / totalValue * 100.
                    // The left-attribute will be the prior "value-type-pile" to fit in the chart-row.
                    const firstFillWidth = getTotalValue(rating['1']) ? getFillWidth(maxPoint, getTotalValue(rating['1'])) : 0;
                    const secondFillWidth = getTotalValue(rating['2']) ? getFillWidth(maxPoint, getTotalValue(rating['2'])) : 0;
                    const thirdFillWidth = getTotalValue(rating['3']) ? getFillWidth(maxPoint, getTotalValue(rating['3'])) : 0;
    
                    return (
                        <ChartRowWrapper>
                            <ChartRow key={i}>
                                <span>{ rating.name }</span>
                                <FillWrapper className='fillWrapper'>
                                    { firstFillWidth ? 
                                        <Fill 
                                            className='fill'
                                            pos={i} 
                                            width={activateFill ? firstFillWidth : 0} 
                                            left={0} 
                                            textOpacity={activateFillText ? 1 : 0}
                                            brColor={colors.lightpinkish()}
                                        ><div>{rating['1'].length ? rating['1'].length + 'st' : ''}</div></Fill> : '' 
                                    }
                                    { secondFillWidth ? 
                                        <Fill 
                                            className='fill'
                                            pos={i} 
                                            width={activateFill ? secondFillWidth : 0} 
                                            left={firstFillWidth} 
                                            textOpacity={activateFillText ? 1 : 0}
                                            brColor={colors.darkpinkish()} 
                                        ><div>{rating['2'].length ? rating['2'].length + 'st' : ''}</div></Fill> : '' 
                                    }
                                    { thirdFillWidth ? 
                                        <Fill 
                                            className='fill'
                                            pos={i} 
                                            width={activateFill ? thirdFillWidth : 0} 
                                            left={firstFillWidth + secondFillWidth} 
                                            textOpacity={activateFillText ? 1 : 0}
                                            brColor={colors.purplish()} 
                                        ><div>{rating['3'].length ? rating['3'].length + 'st' : ''}</div></Fill> : '' 
                                    }
                                </FillWrapper>
                                <div>{ rating.totalValue ? rating.totalValue : '0' }p</div>
                            </ChartRow>
                        </ChartRowWrapper>
                    )
                }
            )}
            </div>
    )}
}

const ChartRowWrapper = styled.div`
    height: 60px;
    position: relative;

    span {
        position: absolute;
        top: -20px;
        left: 0;
    }
`;

const ChartRow = styled.div`
    align-items: center;
    bottom: 0;
    color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
    width: 100%;

    span {
        position: absolute;
    }
`;

const FillWrapper = styled.div`
    background-color: rgba(0,0,0,0.1);
    height: 30px;
    position: relative;
    width: 90%;

    span {
        left: 20px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
`;

const Fill = styled.div`
    align-items: center;
    background-color: ${props=>props.brColor};
    bottom: 0;
    display: flex;
    height: 100%;
    justify-content: center;
    left: ${props=>props.left}%;
    position: absolute;
    transition: 1000ms width ease-in-out;
    width: calc(${props=>props.width}% - 3px);

    div {
        color: #F8B195 !important;
        opacity: ${props=>props.textOpacity};
        transition: opacity 350ms ease-out;
    }
    
    :last-child {
        border: none;
        width: ${props=>props.width}%;
    }
`;

Chart.propTypes = {
    title: PropTypes.string,
    ratings: PropTypes.array,
    maxPoint: PropTypes.number,
}

export default Chart;