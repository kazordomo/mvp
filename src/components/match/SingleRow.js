import React from "react";
import styled from "styled-components";

import colors from "../../assets/colors";

import useAnimation from "../hooks/animation";

const Row = styled.div`
	color: #fff;
	margin-bottom: 20px;
	transform: translate(${props => (props.active ? "0, 0" : "500px, -20px")});
	transition: transform 450ms ease-in-out;

	&:last-child {
		margin-bottom: 0;
	}
`;

const Ratings = styled.div`
	display: flex;
	margin-top: 5px;
	text-align: center;

	div {
		padding: 10px;
		flex: 1;

		&:nth-child(1) {
			background-color: ${colors.pointvalueone()};
			border-top-left-radius: 2px;
			border-bottom-left-radius: 2px;
		}
		&:nth-child(2) {
			background-color: ${colors.pointvaluetwo()};
		}
		&:nth-child(3) {
			background-color: ${colors.pointvaluethree()};
			border-top-right-radius: 2px;
			border-bottom-right-radius: 2px;
		}
	}
`;

const SingleRow = ({ ratings, user, getPlayer, index }) => {
	const isAnimating = useAnimation(75 * index);

	return (
		<Row active={!isAnimating}>
			<div>{user.name}</div>
			<Ratings>
				{ratings
					.sortBy(rating => rating.value)
					.map(rating => (
						<div key={rating.value}>{getPlayer(rating.player).name}</div>
					))}
			</Ratings>
		</Row>
	);
};

export default SingleRow;
