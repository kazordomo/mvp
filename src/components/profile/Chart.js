import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../utils/colors';
import { getFillWidth, getTotalValue } from '../../utils/funcs';
import Fill from './Fill';

const Chart = ({ ratings, maxPoint }) => {
    
    return (
        <div>
            { ratings.map(rating => {

                const getFillWIdth = value => getTotalValue(rating[value]) ? 
                    getFillWidth(maxPoint, getTotalValue(rating[value])) : 0;

                return (
                    <ChartRowWrapper key={rating.name}>
                        <ChartRow>
                            <span>{ rating.name }</span>
                            <FillWrapper className='fillWrapper'>
                                <Fill 
                                    fillWidth={getFillWIdth('1')} 
                                    left={0} 
                                    brColor={colors.pointvalueone()}
                                    rateValueLen={rating['1'].length}
                                />
                                <Fill 
                                    fillWidth={getFillWIdth('2')} 
                                    left={getFillWIdth('1')} 
                                    brColor={colors.pointvaluetwo()}
                                    rateValueLen={rating['2'].length}
                                />
                                <Fill 
                                    fillWidth={getFillWIdth('3')} 
                                    left={getFillWIdth('1') + getFillWIdth('2')} 
                                    brColor={colors.pointvaluethree()} 
                                    rateValueLen={rating['3'].length}
                                />
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

Chart.propTypes = {
    title: PropTypes.string,
    ratings: PropTypes.array,
    maxPoint: PropTypes.number,
}

export default Chart;