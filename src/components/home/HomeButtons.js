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

export default ({ ratingOccasion, userAlreadyRated }) => {
    
    return (
        <Links>
            { 
                (ratingOccasion && !userAlreadyRated) ? 
                    <Link to={'/rate'}>
                        <Button shadow customStyle={{...btnStyle, backgroundColor: colors.orangeish(74)}}>
                            <span>Rösta</span>
                            <MdGrade color={colors.dirtpinkish()} />
                        </Button>
                    </Link> :
                    <Button customStyle={disabledBtnStyle} danger shadow>
                        <span>{ userAlreadyRated ? 'Du har röstat' : 'Rösta (stängd)' }</span>
                        <MdGrade color={colors.dirtpinkish()} />
                    </Button>
            }
            <Link to={'/leaderboard'}>
                <Button shadow customStyle={{...btnStyle, backgroundColor: colors.orangeish(94)}}>
                    <span>Poängliga</span>
                    <MdFormatListNumbered color={colors.dirtpinkish()} />
                </Button>
            </Link>
            <Link to={'/statistics'}>
                <Button customStyle={{...btnStyle, backgroundColor: colors.orangeish(114)}} shadow>
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

    svg {
        font-size: 18px;
    }
`;

const btnStyle = {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    minWidth: '200px',
}

const disabledBtnStyle = {
    ...btnStyle,
}