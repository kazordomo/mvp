import React from 'react';
import styled from 'styled-components';
import colors from '../../utils/colors';
import { MdGrade } from 'react-icons/md'
import Animation from '../_shared/Animation';

export default ({ pos, player }) => {

    // TODO: refactor.
    if (pos === 1) {
        return (
            <Animation type="fadeIn">
                <LeaderRow>
                    <Col>
                        <LeaderPos>
                            #22
                            <div><MdGrade /></div>
                        </LeaderPos>
                        <Name>{player.name}</Name>
                    </Col>
                    <Col>
                        <Points><div>{player.totalScore}</div><div>poäng</div></Points>
                    </Col>
                </LeaderRow>
            </Animation>
        )
    }
    
    return (
        <Animation type="fadeIn" sec={2}>
            <Row>
                <Col>
                    <Pos>
                        #22
                        <div>{pos}</div>
                    </Pos>
                    <Name>{player.name}</Name>
                </Col>
                <Col>
                    <Points><div>{player.totalScore}</div><div>poäng</div></Points>
                </Col>
            </Row>
        </Animation>
    );
}

const Row = styled.div`
    background-color: ${colors.darkish(.35)};
    border-radius: 10px;
    color: #fff;
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
    padding 20px;
`;

const Col = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
`;

const LeaderRow = styled(Row)`
    -webkit-box-shadow: 0px 1px 5px 1px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 1px 5px 1px rgba(0,0,0,0.75);
    box-shadow: 0px 1px 5px 1px rgba(0,0,0,0.75);
    margin: 20px 0 15px -5px;
    padding: 40px 20px;
    width: calc(100% - 30px);
`;

const Pos = styled.div`
    background-color: ${colors.darkish()};
    border: 4px solid ${colors.yellowish()};
    border-radius: 50%;
    box-sizing: border-box;
    font-weight: 700;
    line-height: 75px;
    height: 75px;
    position: relative;
    text-align: center;
    width: 75px;

    div {
        background-color: ${colors.orangeish()};
        border-radius: 50%;
        bottom: -5px;
        line-height: 30px;
        position: absolute;
        right: -5px;
        height: 30px;
        width: 30px;
    }
`;

const LeaderPos = styled(Pos)`
    height: 95px;
    line-height: 95px;
    width: 95px;
`;

const Name = styled.div`
    margin-left: 20px;
`;

const Points = styled.div`
    text-align: center;
`;