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
	z-index: 99;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Buttons = styled.div`
	${Button} {
		min-width: 100px;
		height: 50%;
		line-height: 50px;

		&:first-child {
			background-color: ${colors.greenish()};
			margin-right: 20px;
		}

		&:last-child {
			background-color: ${colors.redish()};
			margin-left: 20px;
		}
	}
`;

const Ratings = styled.div`
	margin-bottom: 20px;
	background-color: rgba(0,0,0,0.55);
	padding: 20px;
	border-radius: 2px;

	div {
		margin-bottom: 5px;

		&:last-child {
			margin-bottom: 0;
		}
	}
`;

const DoneRating = ({ show, ratings, handleDone, handleReset }) =>
	(
		<Wrapper show={show}>
			<div>
				<Ratings>
					{
						ratings.sort((a, b) => b.value - a.value).map(rating =>
							<div key={rating.value}>
								{rating.value}: {rating.player.get('name')}
							</div>)
					}
				</Ratings>
				<Buttons>
					<Button onClick={handleDone}>Rate!</Button>
					<Button onClick={handleReset}>Reset</Button>
				</Buttons>
			</div>
		</Wrapper>
	)

export default DoneRating;