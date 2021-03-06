import React, { memo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdGrade } from "react-icons/md";
import { getFillWidth, getFillColor } from "../../utils";

import useAnimation from "../hooks/animation";

import selectors from "../../data/selectors";

const Row = styled.div`
	align-items: center;
	color: #fff;
	display: flex;
	flex-direction: row;
	height: 100px;
	justify-content: space-between;
	line-height: 100px;
	position: relative;
`;

const Fill = styled.div`
	background-color: ${props =>
		getFillColor(props.pos >= 12 ? props.pos / 2 : props.pos)};
	height: 100%;
	position: absolute;
	transition: 750ms width ease-in-out;
	width: ${props => props.width}%;
`;

const Col = styled.div`
	align-items: center;
	display: flex;
	flex-direction: row;
	padding: 0 20px;
	position: relative;
	z-index: 2;
`;

const Name = styled.div`
	margin-left: 20px;
`;

const Points = styled.div`
	text-align: center;
	line-height: 1.1;
`;

const LeaderboardRow = memo(({ pos, player, maxScore, score }) => {
	const isAnimating = useAnimation(75 * pos);

	const profileId = useSelector(state =>
		selectors.users.getUserProfileId(state, { playerNumber: player.number })
	);

	return (
		<Link to={`/profile/${profileId}`}>
			<Row>
				<Fill
					pos={pos}
					width={
						!isAnimating && score !== 0 ? getFillWidth(maxScore, score) : 0
					}
				/>
				<Col>
					<div>{pos === 1 ? <MdGrade /> : pos}</div>
					<Name>{player.name}</Name>
				</Col>
				<Col>
					<Points>
						<div>{score}</div>
						<div>poäng</div>
					</Points>
				</Col>
			</Row>
		</Link>
	);
});

export default LeaderboardRow;
