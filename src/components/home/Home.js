import React from 'react';
import { useSelector } from 'react-redux';
import colors from '../../assets/colors';
import Container from '../_shared/Container'
import CenteredWrapper from '../_shared/CenteredWrapper';
import HomeNav from './HomeNav';
import HomeButtons from './HomeButtons';

import { getActiveUser } from '../../data/selectors/app';
import { getActiveRatingOccasion } from '../../data/selectors/ratingOccasions';

const Home = () => {

	const activeUser = useSelector(state => getActiveUser(state)); // @todo: change old "user" to "activeUser"
	const activeRatingOccasion = useSelector(state => getActiveRatingOccasion(state));

	const userAlreadyRated = () => {
		if (!activeRatingOccasion) return false;
		const haveRated = activeUser?.ratingOccasions.find(roId => roId === activeRatingOccasion.id);
		return haveRated ? haveRated : false;
	}

	return (
		<Container brColor={colors.spacegrayish()}>
			<HomeNav activeUser={activeUser} />
			<CenteredWrapper>
				<HomeButtons
					ratingOccasion={activeRatingOccasion}
					userAlreadyRated={userAlreadyRated()}
					isGuest={null}
				/>
			</CenteredWrapper>
		</Container>
	)
}

export default Home;