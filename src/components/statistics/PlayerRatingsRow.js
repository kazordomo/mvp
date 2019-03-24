import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../utils/colors';

const PlayerRatingsRow = ({ ratingFrom, ratings, players }) => (
    <Row>
        <div>{ ratingFrom.name }</div>
        <div>
            {
                ratings.map((rating, i) => {
                    return <span key={rating.value}>{ players[rating.toId].name }</span>
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
    height: 40px;
    margin-bottom: 10px;
    justify-content: space-between;
    padding: 0px 5px;

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
        background-color: ${colors.pointvalueone()};
    }
    div span:nth-child(2) {
        background-color: ${colors.pointvaluetwo()};
    }
    div span:nth-child(3) {
        background-color: ${colors.pointvaluethree()};
    }
`;

PlayerRatingsRow.propTypes = {
    ratingFrom: PropTypes.object,
    ratings: PropTypes.array,
    players: PropTypes.object,
}

export default PlayerRatingsRow;