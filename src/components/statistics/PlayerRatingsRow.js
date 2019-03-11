import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../utils/colors';

const PlayerRatingsRow = ({ ratingFrom, ratings, players }) => (
    <Row>
        <div>{ ratingFrom.name }</div>
        {
            // TODO: The key should be rating.value - (fix that a player only can rate once a week first)
            ratings.map((rating, i) => {
                return <span key={i}>{ players[rating.toId].name }</span>
            })
        }
    </Row>
)

const Row = styled.div`
    align-items: center;
    color: #fff;
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;

    div {
        margin-right: 20px;
        width: 20%;
    }

    span {
        border-radius: 2px;
        margin-right: 10px;
        padding: 5px 10px;
        text-align: center;
        width: 33%;
    }
    
    span:nth-child(2) {
        background-color: ${colors.onePoint()};
    }
    span:nth-child(3) {
        background-color: ${colors.twoPoint()};
    }
    span:nth-child(4) {
        background-color: ${colors.threePoint()};
    }
`;

PlayerRatingsRow.propTypes = {

}

export default PlayerRatingsRow;