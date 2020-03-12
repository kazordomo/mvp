import React from 'react';
import styled from 'styled-components';

import colors from '../../assets/colors';

const Info = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 25px;
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
	<Info>
		<Item>1p: <ColorBar color={colors.pointvalueone()} /></Item>
		<Item>2p: <ColorBar color={colors.pointvaluetwo()} /></Item>
		<Item>3p: <ColorBar color={colors.pointvaluethree()} /></Item>
	</Info>
);

export default PointsInfo;