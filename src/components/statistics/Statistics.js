import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import { MdGrade } from 'react-icons/md';
import colors from '../../assets/colors';
import { arrayToObj, getTotalValue } from '../../utils';
import { getRatingOccasionsAsList } from '../../data/selectors/ratingOccasions';
import Nav from '../_shared/Nav';
import Container from '../_shared/Container';
import Wrapper from '../_shared/Wrapper';
import ActiveRatingOccasion from './ActiveRatingOccasion/ActiveRatingOccasion';

const RatingOccasion = styled.div`
	animation: 1s ${fadeInAnimation};
	background-color: ${colors.grayish(0.65)};
	border-radius: 2px;
	box-sizing: border-box;
	box-shadow: 1px 1px 18px 0px rgba(0, 0, 0, 0.75);
	color: #fff;
	margin-bottom: 20px;
	padding: 20px;
	position: relative;
	width: 100%;

	span {
		font-weight: 300;
	}
`;

const Statistics = () => {
	// @todo: sort ratingOccasions
	const ratingOccasions = useSelector(state => getRatingOccasionsAsList(state));

	return ratingOccasions.map(item => {
		return <RatingOccasion
			key={item.id}
			onClick={() => console.log('open')}
		>{item.opponents}</RatingOccasion>
	})
}

export default Statistics;

const fadeInAnimation = keyframes`${fadeIn}`;

const Head = styled.div`
	align-items: center;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 20px;

	h3 {
		font-size: 20px;
		margin: 0;
		padding: 0;
	}
`;

const RoMVP = styled.div`
	align-items: flex-end;
	color: ${colors.yellowish()};
	display: flex;
	flex-direction: row;
	font-size: 18px;

	svg {
		font-size: 22px;
		margin-right: 10px;
	}
`;
