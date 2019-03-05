import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MdGrade } from 'react-icons/md'
import { getTotalValue, getFillWidth, getFillColor } from '../../utils/funcs';

class LeaderboardRow extends Component {

    state = {
        activateFill: false,
    }

    componentDidMount() {
        setTimeout(() => this.setState({ activateFill: true }), 75);
    }

    render() {
        const { pos, player, maxPoint } = this.props;
        
        return (
            <Link to={`/profile/${player.id}`}>
                <Row>
                    <Fill pos={pos} width={
                        (this.state.activateFill && getTotalValue(player.ratings) !== 0) ? 
                        getFillWidth(maxPoint, getTotalValue(player.ratings)) : 0} 
                    />
                    <Col>
                        <div>{ (pos === 1) ? <MdGrade /> : pos }</div>
                        <Name>{player.name}</Name>
                    </Col>
                    <Col>
                        <Points><div>{getTotalValue(player.ratings)}</div><div>poäng</div></Points>
                    </Col>
                </Row>
            </Link>
        );
    }
}

const Row = styled.div`
    align-items: center;
    color: #fff;
    display: flex;
    flex-direction: row;
    height: 100px;
    justify-content: space-between;
    line-height: 100px;
    position: relative;
`;

const Fill = styled.div`
    background-color: ${props=>getFillColor(props.pos)};
    height: 100%;
    position: absolute;
    transition: 1000ms width ease-in-out;
    width: ${props=>props.width}%;
`;

const Col = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    padding: 0 20px;
    position: relative;
    z-index: 2;
`;

const Name = styled.div`
    margin-left: 20px;
`;

const Points = styled.div`
    text-align: center;
    line-height: 1.1;
`;

LeaderboardRow.propTypes = {
    pos: PropTypes.number,
    player: PropTypes.object,
    maxPoint: PropTypes.number,
}

export default LeaderboardRow;