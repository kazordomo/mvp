import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../utils/colors';
import { getFillWidth, getTotalValue } from '../../utils/funcs';

const Chart = ({ title, ratings, maxPoint }) => {

    const fadeInFill = () => {
        const fillWrappers = document.querySelectorAll('.fillWrapper');
        let delay = 200;

        for (let fillWrapper of fillWrappers) {
            for (let [i, fill] of fillWrapper.querySelectorAll('.fill').entries()) {
                setTimeout(() => fill.setAttribute('style', 'opacity: 1'), i * delay);
            }
        }
    }

    // Making sure this will run after the page is rendered.
    setTimeout(() => fadeInFill(), 0);
        
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
                                        width={firstFillWidth} 
                                        left={0} 
                                        brColor={colors.lightpinkish()}
                                    >{rating['1'].length ? rating['1'].length + 'st' : ''}</Fill> : '' 
                                }
                                { secondFillWidth ? 
                                    <Fill 
                                        className='fill'
                                        pos={i} 
                                        width={secondFillWidth} 
                                        left={firstFillWidth} 
                                        brColor={colors.darkpinkish()} 
                                    >{rating['2'].length ? rating['2'].length + 'st' : ''}</Fill> : '' 
                                }
                                { thirdFillWidth ? 
                                    <Fill 
                                        className='fill'
                                        pos={i} 
                                        width={thirdFillWidth} 
                                        left={firstFillWidth + secondFillWidth} 
                                        brColor={colors.purplish()} 
                                    >{rating['3'].length ? rating['3'].length + 'st' : ''}</Fill> : '' 
                                }
                            </FillWrapper>
                            <div>{ rating.totalValue ? rating.totalValue : '0' }p</div>
                        </ChartRow>
                    </ChartRowWrapper>
                )
            }
        )}
        </div>
    )
}

const Title = styled.div`
    color: #fff;
    margin-bottom: 10px;
`;

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
        color: #fff;
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
    opacity: 0;
    position: absolute;
    transition: 1000ms width ease-in-out;
    transition: opacity 650ms ease-out;
    width: calc(${props=>props.width}% - 3px);
    
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