import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MdGrade } from 'react-icons/md'

const getFillColor = pos => `rgba(232,${56 + (pos * 12)},20,1)`;

class PlayerRow extends Component {

    state = {
        activateFill: false,
    }
    

    componentDidMount() {
        setTimeout(() => this.setState({ activateFill: true }), 150);
    }

    getFillWidth = () => {
        const { player, maxPoint } = this.props;
        if (!this.state.activateFill || player.totalScore === 0) return 0;
        if (maxPoint === player.totalScore) return 100;
        return player.totalScore / maxPoint * 100;
    }    

    render() {
        const { pos, player } = this.props;
        
        return (
            <Row>
                <Fill pos={pos} width={this.getFillWidth()} />
                <Col>
                    <div>{ (pos === 1) ? <MdGrade /> : pos }</div>
                    <Name>{player.name}</Name>
                </Col>
                <Col>
                    <Points><div>{player.totalScore}</div><div>poäng</div></Points>
                </Col>
            </Row>
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

PlayerRow.propTypes = {
    pos: PropTypes.number,
    player: PropTypes.object,
    maxPoint: PropTypes.number,
}

export default PlayerRow;