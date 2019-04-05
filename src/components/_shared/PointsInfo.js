import React from 'react';
import styled from 'styled-components';
import colors from '../../assets/colors';
import Animation from '../hoc/Animation';

const PointsInfo = ({ activeAnimation }) => (
    <Info active={activeAnimation}>
        <div>1p: <span></span></div>
        <div>2p: <span></span></div>
        <div>3p: <span></span></div>
    </Info>
);

const Info = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 30px;
    margin-left: ${props=>props.active?'0':'-200px'};
    transform: scale(${props=>props.active?'1':'1.4'});
    transition: margin 650ms cubic-bezier(.36,.36,.26,.86), transform 650ms ease-out;

    div {
        align-items: center;
        display: flex;
        color: #fff;

        span {
            margin-left: 10px;
        }
        :nth-child(1) span {
            background-color: ${colors.pointvalueone()};
        }
        :nth-child(2) span {
            background-color: ${colors.pointvaluetwo()};
        }
        :nth-child(3) span {
            background-color: ${colors.pointvaluethree()};
        }
    }

    div span {
        display: block;
        height: 15px;
        width: 50px;
    }
`;

export default Animation(PointsInfo, 10);