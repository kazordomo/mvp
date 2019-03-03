import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../utils/colors';
import { getFillWidth, getFillColor } from '../../utils/funcs';

const Chart = ({ title, ratings }) => {

    return (
        <Outer>
            <Title>{ title }</Title>
            <Inner>
                { Object.keys(ratings).map((key, i) => 
                    <Pile key={key}>
                        <Fill pos={i}></Fill>
                        <span>{ ratings[key].name }</span>
                    </Pile>) }
            </Inner>
        </Outer>
    );
}

const Outer = styled.div`
    height: 175px;
    margin-bottom: 50px;
    overflow: hidden;
    position: relative;
    width: 100%;
`;

const Title = styled.div`
    color: #fff;
    margin-bottom: 10px;
`;

const Inner = styled.div`
    display: flex;
    flex-row: row;
    height: 100%;
    justify-content: space-between;
    position: absolute;
    width: auto;
`;

const Pile = styled.div`
    background-color: rgba(0,0,0,0.2);
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    height: 100%;
    margin-right: 20px;
    position: relative;
    width: 25px;

    span {
        color: #fff;
        display: block;
        left: 50%;
        top: 50%;
        position: absolute;
        transform: translate(-50%, -50%) rotate(-90deg);
    }
`;

const Fill = styled.div`
    background-color: ${props=>getFillColor(props.pos)};
    bottom: 0;
    height: ${props=>props.height ? props.height : 75}%;
    position: absolute;
    transition: 1000ms width ease-in-out;
    width: 25px;
`;

Chart.propTypes = {

}

export default Chart;