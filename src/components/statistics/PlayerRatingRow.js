import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../utils/colors';

const PlayerRatingRow = ({ ratingFrom, ratings, players }) => (
    <Row>
        <Name>{ ratingFrom.name }</Name>
        <Points>
            { ratings.map(rating => 
                <div key={rating.value}>{ players[rating.toId].name }</div>) 
            }
        </Points>
    </Row>
)

const Row = styled.div`
    color: #fff;
    margin-bottom: 15px;
    height: 50px;
    padding-top: 30px;
    position: relative;
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

export default PlayerRatingRow;