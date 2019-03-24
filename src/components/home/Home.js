import React from 'react';
import PropTypes from 'prop-types';
import colors from '../../utils/colors';
import Container from '../_shared/Container'
import CenteredWrapper from '../_shared/CenteredWrapper';
import HomeNav from './HomeNav';
import HomeButtons from './HomeButtons';

const Home = ({ user, ratingOccasion }) => {
    return (
        <Container brColor={colors.spacegrayish()}>
            <HomeNav user={user} />
            <CenteredWrapper>
                <HomeButtons 
                    ratingOccasion={ratingOccasion} 
                    userAlreadyRated={false} 
                />
            </CenteredWrapper>
        </Container>
    )
}

Home.propTypes = {
    user: PropTypes.object,
}

export default Home;