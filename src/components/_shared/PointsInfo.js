import React from 'react';
import styled from 'styled-components';
import colors from '../../utils/colors';

export default () => (
    <Info>
        <div>1p: <span></span></div>
        <div>2p: <span></span></div>
        <div>3p: <span></span></div>
    </Info>
);

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