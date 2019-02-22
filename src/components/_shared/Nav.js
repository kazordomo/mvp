import React from 'react';
import styled from 'styled-components';
import colors from '../../utils/colors';
import { MdChevronLeft } from 'react-icons/md'
import { Link } from 'react-router-dom';

export default ({ title }) => {

    return (
        <Nav>
            <Link to={'/'}>
                <MdChevronLeft />
            </Link>
            <h2>{title}</h2>
        </Nav>
    )

}

const Nav = styled.nav`
    color: #fff;
    height: 75px;
    line-height: 75px;
    position: relative;
    text-align: center;

    a {
        color: #fff;
        position: absolute;
        left: 0;
        top: 70%;
        text-align: left;
        transform: translateY(-50%);
        width: 0;
        svg {
            font-size: 50px;
        }
    }
`;