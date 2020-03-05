import React from 'react';
import styled from 'styled-components';

import colors from '../../assets/colors';

import useAnimation from '../hooks/animation';

const Info = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 30px;
    margin-left: ${props => props.active ? '0' : '-200px'};
    transform: scale(${props => props.active ? '1' : '1.4'});
    transition: margin 650ms cubic-bezier(.36,.36,.26,.86), transform 650ms ease-out;
`;

const Item = styled.div`
	align-items: center;
	display: flex;
	color: #fff;
`;

const ColorBar = styled.div`
	margin-left: 10px;
	display: block;
	height: 15px;
	width: 50px;
	background-color: ${props => props.color};
`;


const PointsInfo = () => (
	<Info active={!useAnimation()}>
		<Item>1p: <ColorBar color={colors.pointvalueone()} /></Item>
		<Item>2p: <ColorBar color={colors.pointvaluetwo()} /></Item>
		<Item>3p: <ColorBar color={colors.pointvaluethree()} /></Item>
	</Info>
);

export default PointsInfo;