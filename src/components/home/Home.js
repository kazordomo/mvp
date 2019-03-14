import React, { Component } from 'react';
import PropTypes from 'prop-types';
import colors from '../../utils/colors';
import Container from '../_shared/Container'
import CenteredWrapper from '../_shared/CenteredWrapper';
import HomeNav from './HomeNav';
import HomeButtons from './HomeButtons';

class Home extends Component {

    state = {
        showA2HS: false,
        deferredPrompt: null,
    }

    componentDidMount () {
        window.addEventListener('beforeinstallprompt', e => {
            let deferredPrompt;
            e.preventDefault();
            deferredPrompt = e;

            let button = document.querySelector('#A2HS');
            button.addEventListener('click', e => {
                deferredPrompt.deferredPrompt();

                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                      console.log('User accepted the A2HS prompt');
                    } else {
                      console.log('User dismissed the A2HS prompt');
                    }
                    deferredPrompt = null;
                });
            })
        });

        window.addEventListener('appinstalled', () => {
            console.log('a2hs', 'installed');
        });
    }

    render() {
        const { user, onSignOut, ratingOccasion } = this.props;

        return (
            <Container brColor={colors.spacegrayish()}>
                <HomeNav user={user} onSignOut={onSignOut} />
                <CenteredWrapper>
                    <HomeButtons 
                        ratingOccasion={ratingOccasion} 
                        userAlreadyRated={ratingOccasion ? user.ratings.find(rating => rating.ratingOccasionId === ratingOccasion.id) : false} />
                </CenteredWrapper>
                <button id="A2HS" style={{ display: `${this.state.showA2HS ? 'block' : 'none'}` }}>Add to homescreen</button>
            </Container>
        )
    }
}

Home.propTypes = {
    user: PropTypes.object,
}

export default Home;