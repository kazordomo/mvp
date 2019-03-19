import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { arrayToObj, uniqueArray, findUser } from '../../utils/funcs';
import colors from '../../utils/colors';
import Nav from '../_shared/Nav';
import Container from '../_shared/Container';
import Wrapper from '../_shared/Wrapper';
import Chart from './Chart';
import SubTitle from '../_shared/SubTitle';
import PointsInfo from '../_shared/PointsInfo';

const Profile = ({ users, match, history }) => {
    
    const filterRatingsGottenByUser = () => {
        const ratings = [];

        const user = findUser(users, match.params.id);
        if (!user.ratings) return [];

        for (let rating of user.ratings) {
            const ratingFrom = findUser(users, rating.fromId);
            const filtered = 
                [ ...user.ratings ].filter(r => rating.fromId === r.fromId);
            const ratingObj = {
                name: ratingFrom.name,
                totalValue: filtered.reduce((total, a) => total += a.value, 0),
                1: filtered.filter(r => r.value === 1),
                2: filtered.filter(r => r.value === 2),
                3: filtered.filter(r => r.value === 3),
            }
            ratings.push(ratingObj);
        }
        return uniqueArray(ratings).sort((a, b) => b.totalValue - a.totalValue);
    }

    const filterRatingsGivenByUser = () => {
        const ratings = [];

        for (let user of users) {
            if (user.ratings) {
                const ratingsMade = user.ratings.filter(rating => rating.fromId === match.params.id);
                let ratingObj = {};
    
                if (ratingsMade.length > 0) {
                    ratingObj = {
                        name: user.name,
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

    const user = arrayToObj(users)[match.params.id];
    const ratingsGotten = filterRatingsGottenByUser();
    const ratingsGiven = filterRatingsGivenByUser();

    return (
        <Container brColor={colors.spacegrayish()}>
            <Nav title={user.name} goBack={history.goBack} />
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