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

class Home extends Component {
    render() {
        return (
            <div>
                <ImageBr url={brImage} />
                <GradientBr />
                <CenteredWrapper>
                    <Animation type='bounceIn'>
                        <Link to={'/rate'}>
                            <Button customStyle={buttonStyle}>
                                <span>Rösta</span>
                                <MdGrade color={colors.yellowish()} />
                            </Button>
                        </Link>
                    </Animation>
                    <Animation type='bounceIn'>
                        <Link to={'/leaderboard'}>
                            <Button customStyle={buttonStyle}>
                                <span>Poängliga</span>
                                <MdFormatListNumbered color={colors.yellowish()} />
                            </Button>
                        </Link>
                    </Animation>
                    <Animation type='bounceIn'>
                        <Link to={'/statistics'}>
                            <Button customStyle={buttonStyle}>
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

const buttonStyle = {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    minWidth: '200px',
}

export default Home;