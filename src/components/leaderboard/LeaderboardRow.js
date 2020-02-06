import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MdGrade } from 'react-icons/md'
import { getTotalValue, getFillWidth, getFillColor } from '../../utils';
import Animation from '../hoc/Animation';

import * as selectors from '../../data/selectors/users';

const LeaderboardRow = ({ activeAnimation, pos, player, maxPoint }) => {
	const profileId = useSelector(state =>
		selectors.getUserProfileId(state, { playerNumber: player.number }));

	return (
		<Link to={`/profile/${profileId}`}>
			<Row>
				<Fill pos={pos} width={
					(activeAnimation && getTotalValue(player.ratings) !== 0) ?
						getFillWidth(maxPoint, getTotalValue(player.ratings)) : 0}
				/>
				<Col>
					<div>{(pos === 1) ? <MdGrade /> : pos}</div>
					<Name>{player.name}</Name>
				</Col>
				<Col>
					<Points><div>{getTotalValue(player.ratings)}</div><div>poäng</div></Points>
				</Col>
			</Row>
		</Link>
	);
}

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
    background-color: ${props => getFillColor((props.pos >= 12) ? props.pos / 2 : props.pos)};
    height: 100%;
    position: absolute;
    transition: 1000ms width ease-in-out;
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

LeaderboardRow.propTypes = {
	pos: PropTypes.number,
	player: PropTypes.object,
	maxPoint: PropTypes.number,
}

export default Animation(LeaderboardRow);