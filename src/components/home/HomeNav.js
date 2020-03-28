import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
import { Link } from "react-router-dom";
import {
	MdAccountCircle,
	MdSupervisorAccount,
	MdSettings,
	MdInfo,
} from "react-icons/md";
import colors from "../../assets/colors";
import Settings from "./Settings";
import Information from "./Information";

const HomeNav = ({ activeUser }) => {
	const [showSettings, setShowSettings] = useState(false);
	const [showInfo, setShowInfo] = useState(false);

	const onShowHideSettings = () => setShowSettings(prev => !prev);
	const onShowHideInfo = () => setShowInfo(prev => !prev);

	if (!activeUser)
		return (
			<div>
				<Icons>
					<InfoIcon>
						<MdInfo onClick={onShowHideInfo} />
					</InfoIcon>
				</Icons>
				<Information show={showInfo} onClose={onShowHideInfo} isAdmin={false} />
			</div>
		);

	return (
		<div>
			<Icons>
				<Settings show={showSettings} onClose={onShowHideSettings} />
				<MdSettings onClick={onShowHideSettings} />
				<Link to={`/profile/${activeUser.id}`}>
					<MdAccountCircle />
				</Link>
				{activeUser.admin ? (
					<Link to="/admin">
						<MdSupervisorAccount />
					</Link>
				) : (
					""
				)}
				<InfoIcon>
					<MdInfo onClick={onShowHideInfo} />
				</InfoIcon>
			</Icons>
			<Information
				show={showInfo}
				onClose={onShowHideInfo}
				isAdmin={activeUser.admin}
			/>
		</div>
	);
};

const fadeInAnimation = keyframes`${fadeIn}`;

const Icons = styled.div`
	padding: 20px;
	position: relative;
	z-index: 5;

	svg {
		animation: 1s ${fadeInAnimation};
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

export default HomeNav;
