import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MdGrade, MdFormatListNumbered, MdShowChart } from 'react-icons/md'
import colors from '../../utils/colors';
import brImage from '../../images/broddshow.jpeg';
import CenteredWrapper from '../_shared/CenteredWrapper';
import Button from '../_basic/Button';
import Animation from '../_shared/Animation';
import ImageBr from '../_shared/ImageBr';
import GradientBr from '../_shared/GradientBr';
import Input from '../_basic/Input';

class Home extends Component {
    render() {
        return (
            <div>
                <ImageBr url={brImage} />
                <GradientBr />
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
                    {
                        // this.props.user.isAdmin ?
                        true ?
                        <Animation type='bounceIn'>
                            <Link to={'/admin'}>
                                <Button customStyle={btnStyle}>
                                    <span>Admin Area</span>
                                </Button>
                            </Link>
                        </Animation> :
                        ''
                    }
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

export default Home;