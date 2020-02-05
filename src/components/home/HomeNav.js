import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import { Link } from 'react-router-dom';
import colors from '../../assets/colors';
import {
	MdAccountCircle,
	MdSupervisorAccount,
	MdSettings,
	MdInfo,
} from 'react-icons/md';
import Settings from './Settings'
import Information from './Information';

class HomeNav extends Component {

	state = {
		showSettings: false,
		showInfo: false,
	}

	onShowHideSettings = () => this.setState(prevState => { return { showSettings: !prevState.showSettings } });
	onShowHideInfo = () => this.setState(prevState => { return { showInfo: !prevState.showInfo } });

	render() {
		const isUserLoggedIn = true;
		if (isUserLoggedIn) return (
			<div>
				<Icons>
					<InfoIcon>
						<MdInfo onClick={this.onShowHideInfo} />
					</InfoIcon>
				</Icons>
				<Information show={this.state.showInfo} onClose={this.onShowHideInfo} isAdmin={false} />
			</div>
		)

		return (
			<div>
				<Icons>
					<Settings show={this.state.showSettings} onClose={this.onShowHideSettings} />
					<MdSettings onClick={this.onShowHideSettings} />
					<Link to={`/profile/${this.props.user.id}`}>
						<MdAccountCircle />
					</Link>
					{
						// this.props.user.admin ?
						true ?
							<Link to={'/admin'}>
								<MdSupervisorAccount />
							</Link> : ''
					}
					<InfoIcon>
						<MdInfo onClick={this.onShowHideInfo} />
					</InfoIcon>
				</Icons>
				<Information show={this.state.showInfo} onClose={this.onShowHideInfo} isAdmin={this.props.user.admin} />
			</div>
		)
	}
}

const fadeInAnimation = keyframes`${fadeIn}`

const Icons = styled.div`
    padding: 20px;
    position: relative;
    z-index: 5;

    svg {
        animation: 1s ${ fadeInAnimation};
        color: ${colors.dirtpinkish()};
        cursor: pointer;
        font-size: 36px;
        float: right;
        margin-left: 10px;
    }
`;

const InfoIcon = styled.div`
    float: left;

    svg {
        color: ${colors.blue()};
    }
`;

HomeNav.propTypes = {
	user: PropTypes.object,
}

export default HomeNav;
