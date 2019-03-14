import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../utils/colors';

const PlayerRatingsRow = ({ ratingFrom, ratings, players }) => (
    <Row>
        <div>{ ratingFrom.name }</div>
        <div>
            {
                // TODO: The key should be rating.value - (fix that a player only can rate once a week first)
                ratings.map((rating, i) => {
                    return <span key={i}>{ players[rating.toId].name }</span>
                })
            }
        </div>
    </Row>
)

const Row = styled.div`
    align-items: center;
    color: #fff;
    display: flex;
    flex-direction: row;
    height: 25px;
    margin-bottom: 10px;
    justify-content: space-between;
    overflow: auto;

    div:first-child {
        margin-right: 20px;
        width: 15%;
    }
    div:last-child {
        display: flex;
        flex-direction: row;
        width: calc(85% - 20px);
    }

    div span {
        display: block;
        border-radius: 2px;
        margin-right: 10px;
        text-align: center;
        padding: 10px 20px;
        width: 33%;

        :last-child {
            margin-right: 0;
        }
    }
    
    div span:nth-child(1) {
        background-color: ${colors.orangeish(160)};
    }
    div span:nth-child(2) {
        background-color: ${colors.orangeish(90)};
    }
    div span:nth-child(3) {
        background-color: ${colors.orangeish(20)};
    }
`;

PlayerRatingsRow.propTypes = {

}

export default PlayerRatingsRow;