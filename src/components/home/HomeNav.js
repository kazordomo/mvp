import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import { Link } from 'react-router-dom';
import colors from '../../utils/colors';
import { 
    MdAccountCircle, 
    MdSupervisorAccount,
    MdSettings,
} from 'react-icons/md'
import Settings from './Settings'

class HomeNav extends Component {

    state = {
        showSettings: false,
    }

    onShowHideSettings = () => this.setState(prevState => { return { showSettings: !prevState.showSettings }});

    render () {
        return (
            <Icons>
                <Settings show={this.state.showSettings} onClose={this.onShowHideSettings} onSignOut={this.props.onSignOut} />
                <MdSettings onClick={this.onShowHideSettings} />
                <Link to={`/profile/${this.props.user.id}`}>
                    <MdAccountCircle />
                </Link>
                {
                    // this.props.user.isAdmin ?
                    true ?
                    <Link to={'/admin'}>
                        <MdSupervisorAccount />
                    </Link> : ''
                }
            </Icons>
        )
    }
}

const fadeInAnimation = keyframes`${fadeIn}`

const Icons = styled.div`
    padding: 20px;
    position: relative;
    z-index: 5;

    svg {
        animation: 1s ${ fadeInAnimation };
        color: ${colors.dirtpinkish()};
        cursor: pointer;
        font-size: 36px;
        float: right;
        margin-left: 10px;
    }
`;

HomeNav.propTypes = {
    user: PropTypes.object,
}

export default HomeNav;
