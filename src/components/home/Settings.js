import React from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import colors from "../../assets/colors";
import { signOut } from "../../firebase/fetch";

const Settings = ({ show, onClose }) => {
	return (
		<SettingsWrapper show={show}>
			<div>
				<SettingsLink href="http://guldfemman.se/norrtulls-sk" target="_blank">
					Guldfemman
				</SettingsLink>
				<SettingsLink onClick={signOut}>Logga ut</SettingsLink>
			</div>
			<MdClose onClick={onClose} />
		</SettingsWrapper>
	);
};

const SettingsWrapper = styled.div`
	align-items: center;
	background-color: ${colors.grayish()};
	box-sizing: border-box;
	box-shadow: 1px 1px 18px 0px rgba(0, 0, 0, 0.25);
	display: flex;
	justify-content: space-between;
	padding: 0px 20px;
	position: absolute;
	height: 75px;
	right: 0;
	left: 0;
	top: ${props => (props.show ? "0" : "-100")}px;
	transition: top 150ms ease-out;
	z-index: 6;

	svg {
		color: #fff !important;
	}
`;

const SettingsLink = styled.a`
	border-bottom: 1px solid #fff;
	color: #fff;
	margin-right: 20px;
	padding: 2px 5px;

	:last-child {
		border-bottom: 1px solid ${colors.redish()};
		color: ${colors.redish()};
	}
`;

export default Settings;
