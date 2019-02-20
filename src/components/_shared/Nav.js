import React from 'react';
import styled from 'styled-components';
import colors from '../../utils/colors';
import { MdArrowBack } from 'react-icons/md'
import { Link } from 'react-router-dom';

export default () => {

    return (
        <Nav>
            <Link to={'/'}>
                <MdArrowBack />
            </Link>
        </Nav>
    )

}

const Nav = styled.nav`
    padding: 20px;
    width: calc(100% - 40px);

    a {
        color: ${colors.darkish()};
    }
`