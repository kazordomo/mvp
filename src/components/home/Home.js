import React from 'react';
import { useSelector } from 'react-redux';
import colors from '../../assets/colors';
import Container from '../_shared/Container'
import CenteredWrapper from '../_shared/CenteredWrapper';
import HomeNav from './HomeNav';
import HomeButtons from './HomeButtons';

import selectors from '../../data/selectors';

const Home = () => {

	const activeUser = useSelector(state => selectors.app.getActiveUser(state));
	const activeMatch = useSelector(state => selectors.matches.findActive(state));

	return (
		<Container brColor={colors.spacegrayish()}>
			<HomeNav activeUser={activeUser} />
			<CenteredWrapper>
				<HomeButtons
					ratingOccasion={activeMatch}
					userAlreadyRated={activeUser?.matches.includes(activeMatch)}
					isGuest={null}
				/>
			</CenteredWrapper>
		</Container>
	)
}

export default Home;