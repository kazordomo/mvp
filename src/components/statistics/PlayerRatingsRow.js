import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../utils/colors';

const PlayerRatingsRow = ({ ratingFrom, ratings, players }) => {

    return (
        <Row>
            <div>{ ratingFrom.name }</div>
            {
                // TODO: The key should be rating.value - (fix that a player only can rate once a week first)
                ratings.map((rating, i) => {
                    return <span key={i}>{ players[rating.toId].name } - { rating.value }p</span>
                })
            }
        </Row>
    )
}

const Row = styled.div`
    align-items: center;
    color: #fff;
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;

    div {
        margin-right: 20px;
    }

    span {
        background-color: pink;
        border-radius: 2px;
        margin-right: 5px;
        padding: 5px 10px;
    }
    
    span:nth-child(1) {
        background-color: ${colors.lightpinkish()};
    }
    span:nth-child(2) {
        background-color: ${colors.darkpinkish()};
    }
    span:nth-child(3) {
        background-color: ${colors.purplish()};
    }
`;

PlayerRatingsRow.propTypes = {

}

export default PlayerRatingsRow;