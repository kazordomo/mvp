import React from 'react';
import PropTypes from 'prop-types';
import colors from '../../utils/colors';
import { isEmptyObj } from '../../utils/funcs';
import Container from '../_shared/Container'
import CenteredWrapper from '../_shared/CenteredWrapper';
import HomeNav from './HomeNav';
import HomeButtons from './HomeButtons';

const Home = ({ user, ratingOccasion }) => {

    const userAlreadyRated = () => {
        if (isEmptyObj(user)) return;
        if (!ratingOccasion) return false;
        const haveRated = user.ratingOccasions.find(roId => roId === ratingOccasion.id);
        return haveRated ? haveRated : false;
    }

    return (
        <Container brColor={colors.spacegrayish()}>
            <HomeNav user={user} />
            <CenteredWrapper>
                <HomeButtons 
                    ratingOccasion={ratingOccasion} 
                    userAlreadyRated={userAlreadyRated()} 
                    isGuest={isEmptyObj(user)}
                />
            </CenteredWrapper>
        </Container>
    )
}

Home.propTypes = {
    user: PropTypes.object,
}

export default Home;