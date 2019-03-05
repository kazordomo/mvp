import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { arrayToObj, uniqueArray } from '../../utils/funcs';
import colors from '../../utils/colors';
import Nav from '../_shared/Nav';
import Container from '../_shared/Container';
import Wrapper from '../_shared/Wrapper';
import Chart from './Chart';
import SubTitle from '../_shared/SubTitle';

const Profile = ({ players, match, history }) => {
    
    const filterRatingsByUser = () => {
        const findPlayer = id => 
            players.find(player => player.id === id);
        const ratings = [];

        const player = findPlayer(match.params.id);
        for (let rating of player.ratings) {
            const ratingFrom = findPlayer(rating.from);
            const filtered = 
                [ ...player.ratings ].filter(r => rating.from === r.from);
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

    const player = arrayToObj(players)[match.params.id];
    const ratingsGotten = filterRatingsByUser();
    const ratingsGiven = [];

    return (
        <Container brColor={colors.spacegrayish()}>
            <Nav title={player.name} goBack={history.goBack} />
            <Info>
                <div>1p: <span></span></div>
                <div>2p: <span></span></div>
                <div>3p: <span></span></div>
            </Info>
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

Profile.propTypes = {
    players: PropTypes.array,
}

export default Profile;