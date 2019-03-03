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
import brImage from '../../images/broddshow.jpeg';
import CenteredWrapper from '../_shared/CenteredWrapper';
import Button from '../_basic/Button';
import Animation from '../_shared/Animation';
import ImageBr from '../_shared/ImageBr';
import GradientBr from '../_shared/GradientBr';

class Home extends Component {
    render() {
        return (
            <div>
                <ImageBr url={brImage} />
                <GradientBr />
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
                                <Button customStyle={btnStyle}>
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
                            <Button customStyle={btnStyle}>
                                <span>Poängliga</span>
                                <MdFormatListNumbered color={colors.yellowish()} />
                            </Button>
                        </Link>
                    </Animation>
                    <Animation type='bounceIn'>
                        <Link to={'/statistics'}>
                            <Button customStyle={btnStyle}>
                                <span>Statistik</span>
                                <MdShowChart color={colors.yellowish()} />
                            </Button>
                        </Link>
                    </Animation>
                </CenteredWrapper>
            </div>
        )
    }
}

const btnStyle = {
    alignItems: 'center',
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
        color: #fff;
        cursor: pointer;
        font-size: 36px;
        float: right;
        margin-left: 10px;
    }
`;

export default Home;