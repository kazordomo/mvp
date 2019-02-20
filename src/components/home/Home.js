import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MdGrade, MdFormatListNumbered, MdShowChart } from 'react-icons/md'
import colors from '../../utils/colors';
import Button from '../_basic/Button';

class Home extends Component {
    render() {
        return (
            <Wrapper>
                <Link to={'/rate'}>
                    <Button customStyle={buttonStyle}>
                        <span>Rösta</span>
                        <MdGrade color={colors.yellowish()} />
                    </Button>
                </Link>
                <Link to={'/leaderboard'}>
                    <Button customStyle={buttonStyle}>
                        <span>Poängliga</span>
                        <MdFormatListNumbered color={colors.yellowish()} />
                    </Button>
                </Link>
                <Link to={'/statistics'}>
                    <Button customStyle={buttonStyle}>
                        <span>Statistik</span>
                        <MdShowChart color={colors.yellowish()} />
                    </Button>
                </Link>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
`;

const buttonStyle = {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    minWidth: '200px',
}

export default Home;