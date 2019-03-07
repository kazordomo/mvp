import React from 'react';
import colors from '../../utils/colors';
import styled, { keyframes } from 'styled-components';
import { bounceIn } from 'react-animations';
import { Link } from 'react-router-dom';
import { 
    MdGrade, 
    MdFormatListNumbered, 
    MdShowChart, 
} from 'react-icons/md'
import Button from '../_basic/Button';

export default () => {

    const Rating = () => {
        return true ? (
            <Link to={'/rate'}>
                <Button customStyle={{...btnStyle, backgroundColor: colors.orangeish(74)}}>
                    <span>Rösta</span>
                    <MdGrade color={colors.dirtpinkish()} />
                </Button>
            </Link> 
        ) : (
            <Button customStyle={disabledBtnStyle}>
                <span>Rösta</span>
                <MdGrade color={colors.dirtpinkish()} />
            </Button>
        )
    }
    
    return (
        <Links>
            <Rating />
            <Link to={'/leaderboard'}>
                <Button customStyle={{...btnStyle, backgroundColor: colors.orangeish(94)}}>
                    <span>Poängliga</span>
                    <MdFormatListNumbered color={colors.dirtpinkish()} />
                </Button>
            </Link>
            <Link to={'/statistics'}>
                <Button customStyle={{...btnStyle, backgroundColor: colors.orangeish(114)}}>
                    <span>Statistik</span>
                    <MdShowChart color={colors.dirtpinkish()} />
                </Button>
            </Link>
        </Links>
    );
}

const bounceInAnimation = keyframes`${bounceIn}`;

const Links = styled.div`
    button {
        animation: 1s ${bounceInAnimation};
    }
`;

const btnStyle = {
    alignItems: 'center',
    boxShadow: '-3px 1px 18px 0px rgba(0,0,0,0.75)',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    minWidth: '200px',
}

const disabledBtnStyle = {
    backgroundColor: 'pink',
    ...btnStyle,
}