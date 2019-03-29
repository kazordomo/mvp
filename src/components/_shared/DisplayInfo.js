import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MdInfo } from 'react-icons/md'
import colors from '../../utils/colors';
import Button from '../_basic/Button';

const DisplayError = ({ infoMsg, close }) => (
    <Info show={!!infoMsg}>
        <Icon>
            <MdInfo />
        </Icon>
        { infoMsg }
        <Button customStyle={btnStyle} success long onClick={close}>OK</Button>
    </Info>
)

const Info = styled.div`
    background-color: ${colors.grayish()};
    border-radius: 2px;
    box-sizing: border-box;
    box-shadow: 1px 1px 18px 0px rgba(0,0,0,0.75);
    display: ${props=>props.show?'flex':'none'};
    flex-direction: column;
    justify-content: space-between;
    color: #fff;
    position: fixed;
    min-height: 200px;
    top: 50%;
    left: 50%;
    padding: 20px;
    transform: translate(-50%, -50%);
    width: 280px;
    z-index: 5;
`;

const Icon = styled.div`
    text-align: center;
    margin-bottom: 10px;

    svg {
        font-size: 40px;
    }
`;

const btnStyle = {
    bottom: '20px',
    height: '45px',
    lineHeight: '45px',
    marginTop: '20px',
}

DisplayError.propTypes = {
    infoMsg: PropTypes.string,
}

export default DisplayError;