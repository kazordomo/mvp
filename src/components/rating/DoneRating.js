import React from 'react';
import styled from 'styled-components';

import colors from '../../assets/colors';

import Button from '../_basic/Button';

const Wrapper = styled.div`
	position: fixed;
	transform: translateX(${props => props.show ? '0' : '-150%'});
	width: 100%;
	height: 100%;
	transition: transform 300ms ease-in-out; 
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 99;
`;

const Buttons = styled.div`
	${Button} {
		min-width: 100px;
		margin: 0 20px;
		height: 50%;
		line-height: 50px;

		&:first-child {
			background-color: ${colors.greenish()};
		}

		&:last-child {
			background-color: ${colors.redish()};
		}
	}
`;

const DoneRating = ({ show, handleDone, handleReset }) =>
	(
		<Wrapper show={show}>
			<Buttons>
				<Button onClick={handleDone}>Rate!</Button>
				<Button onClick={handleReset}>Reset</Button>
			</Buttons>
		</Wrapper>
	)

export default DoneRating;