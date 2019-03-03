import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { 
    MdGrade, 
    MdFormatListNumbered, 
    MdShowChart, 
    MdAccountCircle, 
    MdSupervisorAccount 
} from 'react-icons/md'
import styled from 'styled-components';
import colors from '../../utils/colors';
import Container from '../_shared/Container'
import CenteredWrapper from '../_shared/CenteredWrapper';
import Button from '../_basic/Button';
import Animation from '../_shared/Animation';

class Home extends Component {
    render() {
        return (
            <Container brColor={colors.spacegrayish()}>
                <Icons>
                    <Animation type="fadeIn">
                        <Link to={`/profile/${this.props.user.id}`}>
                            <MdAccountCircle />
                        </Link>
                    </Animation>
                    {
                        // this.props.user.isAdmin ?
                        true ?
                        <Animation type="fadeIn">
                            <Link to={'/admin'}>
                                <MdSupervisorAccount />
                            </Link>
                        </Animation> : ''
                    }
                </Icons>
                <CenteredWrapper>
                    {
                        // (this.props.user.isAdmin && this.props.isRatingOpen) ?
                        true ?
                        <Animation type='bounceIn'>
                            <Link to={'/rate'}>
                                <Button customStyle={{...btnStyle, backgroundColor: 'rgba(232,74,20,1)'}}>
                                    <span>Rösta</span>
                                    <MdGrade color={colors.yellowish()} />
                                </Button>
                            </Link>
                        </Animation> :
                        <Animation type='bounceIn'>
                            <Button customStyle={disabledBtnStyle}>
                                <span>Rösta</span>
                                <MdGrade color={colors.yellowish()} />
                            </Button>
                        </Animation>
                    }
                    <Animation type='bounceIn'>
                        <Link to={'/leaderboard'}>
                            <Button customStyle={{...btnStyle, backgroundColor: 'rgba(232,94,20,1)'}}>
                                <span>Poängliga</span>
                                <MdFormatListNumbered color={colors.yellowish()} />
                            </Button>
                        </Link>
                    </Animation>
                    <Animation type='bounceIn'>
                        <Link to={'/statistics'}>
                            <Button customStyle={{...btnStyle, backgroundColor: 'rgba(232,114,20,1)'}}>
                                <span>Statistik</span>
                                <MdShowChart color={colors.yellowish()} />
                            </Button>
                        </Link>
                    </Animation>
                </CenteredWrapper>
            </Container>
        )
    }
}

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

const Icons = styled.div`
    padding: 20px;
    position: relative;
    z-index: 5;

    svg {
        color: ${colors.yellowish()};
        cursor: pointer;
        font-size: 36px;
        float: right;
        margin-left: 10px;
    }
`;

export default Home;