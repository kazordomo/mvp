import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { bounceIn } from 'react-animations';
import {
	MdGrade,
	MdFormatListNumbered,
	MdShowChart,
} from 'react-icons/md'

import colors from '../../assets/colors';
import Container from '../_shared/Container'
import CenteredWrapper from '../_shared/CenteredWrapper';
import Button from '../_basic/Button';
import HomeNav from './HomeNav';

import selectors from '../../data/selectors';

const bounceInAnimation = keyframes`${bounceIn}`;

const HomeButton = styled(Button)`
	align-items: center;
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
	min-width: 200px;
	animation: 1s ${bounceInAnimation};

	${props => props.brColor && !props.danger && css`
		background-color: ${props => props.brColor};
	`}

	svg {
		font-size: 18px;
	}
`;

const Home = () => {

	const activeUser = useSelector(state => selectors.app.getActiveUser(state));
	const activeMatch = useSelector(state => selectors.matches.findActive(state));
	const alreadyRated = false;

	const ableToRate = activeUser && activeMatch && !alreadyRated;

	return (
		<Container brColor={colors.spacegrayish()}>
			<HomeNav activeUser={activeUser} />
			<CenteredWrapper>
				{ableToRate ? (
					<Link to={'/rate'}>
						<HomeButton shadow brColor={colors.orangeish(74)}>
							<span>Rösta</span>
							<MdGrade color={colors.dirtpinkish()} />
						</HomeButton>
					</Link>
				) : (
						<HomeButton danger shadow brColor={colors.orangeish(74)}>
							<span>Rösta</span>
							<MdGrade color={colors.dirtpinkish()} />
						</HomeButton>
					)}
				<Link to={'/leaderboard'}>
					<HomeButton shadow brColor={colors.orangeish(94)}>
						<span>Poängliga</span>
						<MdFormatListNumbered color={colors.dirtpinkish()} />
					</HomeButton>
				</Link>
				<Link to={'/matches'}>
					<HomeButton shadow brColor={colors.orangeish(114)}>
						<span>Statistik</span>
						<MdShowChart color={colors.dirtpinkish()} />
					</HomeButton>
				</Link>
			</CenteredWrapper>
		</Container>
	)
}

export default Home;