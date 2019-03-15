import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../utils/colors';

const DisplayError = ({ errorMsg }) => <Error show={!!errorMsg}>{ errorMsg }</Error>;

const Error = styled.div`
    background-color: ${colors.redish()};
    border-top-right-radius: 2px;
    border-top-left-radius: 2px;
    box-shadow: 1px 1px 18px 0px rgba(0,0,0,0.75);
    color: #fff;
    font-size: 14px;
    height: 30px;
    margin-left: ${props=>props.show ? '0px' : '-100%'};
    line-height: 30px;
    padding: 0px 20px;
    position: fixed;
    top: 30px;
    transition: margin 150ms ease-out;
    min-width: 150px;
`;

DisplayError.propTypes = {
    errorMsg: PropTypes.string,
}

export default DisplayError;