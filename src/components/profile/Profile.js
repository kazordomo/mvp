import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { arrayToObj, uniqueArray, findById } from '../../utils/funcs';
import colors from '../../utils/colors';
import Nav from '../_shared/Nav';
import Container from '../_shared/Container';
import Wrapper from '../_shared/Wrapper';
import Chart from './Chart';
import SubTitle from '../_shared/SubTitle';
import PointsInfo from '../_shared/PointsInfo';

const Profile = ({ users, players, match, history }) => {

    // We divide the user and player object because we know that only users will have given ratings - and
    // only player will have gotten ratings. It makes it easier to check if we should continue or not.
    const user = findById(users, match.params.id);
    let player = false;

    // Check if the user is a player. If not, check if player exists without a user attached.
    if (user) {
        if (findById(players, user.playerNumber))
            player = players.find(p => p.id === user.playerNumber);
    } else if (findById(players, match.params.id))
        player = findById(players, match.params.id);

    const filterRatingsGottenByUser = () => {
        const ratings = [];

        // Only players will be able to have gotten ratings.
        if (!player || !player.ratings) return [];

        for (let rating of player.ratings) {
            const allRatingsFromUser = player.ratings.filter(r => r.fromId === rating.fromId);
            const ratingObj = {
                name: findById(users, rating.fromId).name,
                totalValue: allRatingsFromUser.reduce((total, a) => total += a.value, 0),
                1: allRatingsFromUser.filter(r => r.value === 1),
                2: allRatingsFromUser.filter(r => r.value === 2),
                3: allRatingsFromUser.filter(r => r.value === 3),
            }
            ratings.push(ratingObj);
        }
        return uniqueArray(ratings).sort((a, b) => b.totalValue - a.totalValue);
    }

    const filterRatingsGivenByUser = () => {
        const ratings = [];

        for (let player of players) {
            if (player.ratings) {
                const ratingsMade = player.ratings.filter(r => r.fromId === match.params.id);
                let ratingObj = {};
                if (ratingsMade.length > 0) {
                    ratingObj = {
                        name: player.name,
                        totalValue: ratingsMade.reduce((total, a) => total += a.value, 0),
                        1: ratingsMade.filter(r => r.value === 1),
                        2: ratingsMade.filter(r => r.value === 2),
                        3: ratingsMade.filter(r => r.value === 3),
                    }
                    ratings.push(ratingObj);
                }
    
            }
        }
        return uniqueArray(ratings).sort((a, b) => b.totalValue - a.totalValue);
    }

    const getQuote = () => {
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

    const ratingsGotten = filterRatingsGottenByUser();
    const ratingsGiven = filterRatingsGivenByUser();

    return (
        <Container brColor={colors.spacegrayish()}>
            <Nav title={player ? player.name : user.name} goBack={history.goBack} />
            <PointsInfo />
            <Col margin>
                <Wrapper>
                    <SubTitle>Poäng från användare</SubTitle>
                    { 
                        Object.keys(ratingsGotten).length ? 
                        <Chart title='Poäng från användare' ratings={ratingsGotten} maxPoint={ratingsGotten[0].totalValue} />
                        : <div>{ getQuote() }</div>
                    }
                </Wrapper>
            </Col>
            <Col>
                <Wrapper>
                    <SubTitle>Utdelade Poäng</SubTitle>
                    { 
                        Object.keys(ratingsGiven).length ? 
                        <Chart title='Poäng från användare' ratings={ratingsGiven} maxPoint={ratingsGiven[0].totalValue} />
                        : <div>Inget utdelat än.</div>
                    }
                </Wrapper>
            </Col>
        </Container>
    )
}

const Col = styled.div`
    background-color: rgba(0,0,0,0.1);
    margin-bottom: ${props=>props.margin ? '20' : '0'}px;
    padding: 20px 0 40px 0;

    div {
        color: #fff;
    }
`;

Profile.propTypes = {
    users: PropTypes.array,
}

export default Profile;