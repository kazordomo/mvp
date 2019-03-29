import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '../../utils/colors';
import Animation from '../hoc/Animation';

class PlayerRatingRow extends Component {

    componentDidMount() {
        this.props.setCustomAnimationDelay(50 * this.props.pos);
    }

    render () {
        const { ratingFrom, ratings, players, profileId } = this.props;

        return (
            <Link to={`/profile/${profileId}`}>
                <Row active={this.props.activeAnimation}>
                    <Name>{ ratingFrom.name }</Name>
                    <Points>
                        { ratings.map(rating => 
                            <div key={rating.value}>{ players[rating.toId].name }</div>) 
                        }
                    </Points>
                </Row>
            </Link>
        )
    }
}

const Row = styled.div`
    color: #fff;
    margin-bottom: 15px;
    height: 50px;
    padding-top: 30px;
    position: relative;
    transform: scale(${props=>props.active ? '1' : '0'});
    transition: transform 450ms ease-in-out;
`;

const Name = styled.div`
    left: 0;
    position: absolute;
    top: 5px;
`;

const Points = styled.div`
    display: flex;
    flex-direction: row;

    div {
        flex: 1;
        height: 50px;
        line-height: 50px;
        text-align: center;
    }

    div:nth-child(1) {
        background-color: ${colors.pointvalueone()};
    }
    div:nth-child(2) {
        background-color: ${colors.pointvaluetwo()};
    }
    div:nth-child(3) {
        background-color: ${colors.pointvaluethree()};
    }
`;

PlayerRatingRow.propTypes = {
    ratingFrom: PropTypes.object,
    ratings: PropTypes.array,
    players: PropTypes.object,
}

export default Animation(PlayerRatingRow);