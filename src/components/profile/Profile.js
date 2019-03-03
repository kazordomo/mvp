import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { signOut } from '../../utils/fetch';
import { arrayToObj, getTotalValue } from '../../utils/funcs';
import colors from '../../utils/colors';
import Nav from '../_shared/Nav';
import Container from '../_shared/Container';
import Wrapper from '../_shared/Wrapper';
import Button from '../_basic/Button';

class Profile extends Component {

    state = {
        structuredRatings: {},
    }

    componentDidMount() {
        this.filterRatingsByUser();
    }

    filterRatingsByUser = () => {
        const player = arrayToObj(this.props.players)[this.props.match.params.id];
        const ratingsObj = {};
        let allRatings = [ ...player.ratings ];
        for (let rating of allRatings) {
            let ratingFrom = arrayToObj(this.props.players)[rating.from];
            let filters = allRatings.filter(r => rating.from === r.from);
            ratingsObj[ratingFrom.id] = { 
                name: ratingFrom.name, 
                totalValue: filters.reduce((total, a) => total += a.value, 0) 
            };
        }
        this.setState({ structuredRatings: ratingsObj });
    }

    render() {
        const player = arrayToObj(this.props.players)[this.props.match.params.id];
        const { structuredRatings } = this.state;

        return (
            <Container brColor={colors.spacegrayish()}>
                <Nav title={player.name} goBack={this.props.history.goBack} />
                <Wrapper>
                    <Points>
                        <div>Totala Poäng: { getTotalValue(player) }</div>
                        <div>Totala Poäng från individer:</div>
                        <div>{ Object.keys(structuredRatings).map(key => 
                            <div key={key}> { structuredRatings[key].name } - { structuredRatings[key].totalValue } </div>) }
                        </div>
                    </Points>
                    {
                        (this.props.user.id === this.props.match.params.id) ?
                            <Button danger onClick={this.props.onSignOut} customStyle={btnStyle} >Logga ut</Button> :
                            ''
                    }
                </Wrapper>
            </Container>
        )
    }
}

const Points = styled.div`
    color: #fff;
`;

const btnStyle = {
    bottom: '20px',
    boxShadow: '0px 1px 10px 0px rgba(0,0,0,0.75)',
    left: '50%',
    transform: 'translateX(-50%)',
    position: 'absolute',
}

Profile.propTypes = {
    user: PropTypes.object,
}

export default Profile;