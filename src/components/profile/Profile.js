import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { signOut } from '../../utils/fetch';
import { arrayToObj } from '../../utils/funcs';
import colors from '../../utils/colors';
import Nav from '../_shared/Nav';
import Container from '../_shared/Container';
import Wrapper from '../_shared/Wrapper';
import Button from '../_basic/Button';
import Chart from './Chart';
import SubTitle from '../_shared/SubTitle';

class Profile extends Component {

    state = {
        ratingsGotten: [],
        ratingsGiven: [],
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
                totalValue: filters.reduce((total, a) => total += a.value, 0),
                1: filters.filter(filter => filter.value === 1),
                2: filters.filter(filter => filter.value === 2),
                3: filters.filter(filter => filter.value === 3),
            }
        }
        // Convert to array as well as sort by most points given.
        const ratingsArr = Object.keys(ratingsObj).sort(function(a,b){
            return ratingsObj[b].totalValue - ratingsObj[a].totalValue;
        }).map(key => ratingsObj[key]);
        this.setState({ ratingsGotten: ratingsArr });
    }

    getQuote = () => {
        const quoteBegining = 'Inga poäng - ';
        const quoteArr = [
            `${quoteBegining}Lira lite bättre.`,
            `${quoteBegining}Ta hemjobbet.`,
            `${quoteBegining}På't igen`,
            `${quoteBegining}Det kommer.`,
            `${quoteBegining}Dags att vinna andrabollarna.`
        ]
        return quoteArr[ Math.floor(Math.random() * Math.floor(4))];
    }

    render() {
        const player = arrayToObj(this.props.players)[this.props.match.params.id];
        const { ratingsGotten, ratingsGiven } = this.state;

        return (
            <Container brColor={colors.spacegrayish()}>
                <Nav title={player.name} goBack={this.props.history.goBack} />
                <Info>
                    <div>1p: <span></span></div>
                    <div>2p: <span></span></div>
                    <div>3p: <span></span></div>
                </Info>
                <Col>
                    <Wrapper>
                        <SubTitle>Poäng från användare</SubTitle>
                        { 
                            Object.keys(this.state.ratingsGotten).length ? 
                            <Chart title='Poäng från användare' ratings={ratingsGotten} maxPoint={ratingsGotten[0].totalValue} />
                            : <div>{ this.getQuote() }</div>
                        }
                    </Wrapper>
                </Col>
                <Col>
                    <Wrapper>
                        <SubTitle>Utdelade Poäng</SubTitle>
                        { 
                            Object.keys(this.state.ratingsGiven).length ? 
                            <Chart title='Poäng från användare' ratings={ratingsGiven} maxPoint={ratingsGiven[0].totalValue} />
                            : <div>Inget utdelat än.</div>
                        }
                    </Wrapper>
                </Col>
                {
                    (this.props.user.id === this.props.match.params.id) ?
                        <ButtonWrapper><Button danger onClick={this.props.onSignOut} customStyle={btnStyle} >Logga ut</Button></ButtonWrapper> :
                        ''
                }
            </Container>
        )
    }
}

const Col = styled.div`
    background-color: rgba(0,0,0,0.1);
    margin-bottom: 20px;
    padding: 20px 0 40px 0;

    div {
        color: #fff;
    }
`;

const Info = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 30px;
    padding: 0 20px;

    div {
        align-items: center;
        display: flex;
        color: #fff;

        span {
            margin-left: 10px;
        }
        :nth-child(1) span {
            background-color: ${colors.lightpinkish()};
        }
        :nth-child(2) span {
            background-color: ${colors.darkpinkish()};
        }
        :nth-child(3) span {
            background-color: ${colors.purplish()};
        }
    }

    div span {
        display: block;
        height: 15px;
        width: 50px;
    }
`;

const ButtonWrapper = styled.div`
    margin: 0 auto;
    padding-bottom: 20px;
    text-align: center;
`;

const btnStyle = {
    boxShadow: '-1px 1px 18px 0px rgba(0,0,0,0.75)',
    margin: '0 auto',
}

Profile.propTypes = {
    user: PropTypes.object,
}

export default Profile;