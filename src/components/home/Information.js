import React, { Component } from "react";
import styled from "styled-components";
import {
	MdGrade,
	MdFormatListNumbered,
	MdShowChart,
	MdAccountCircle,
	MdSupervisorAccount,
	MdClose,
} from "react-icons/md";
import colors from "../../assets/colors";
import infoTrans from "../../translations/infoTrans";

class Information extends Component {
	state = {
		language: "SV",
	};

	onChangeLang = lang => this.setState({ language: lang });

	getCorrectTrans = (section, type) =>
		this.state.language === "SV"
			? infoTrans.swedish[section][type]
			: infoTrans.english[section][type];

	render() {
		const { show, isAdmin, onClose } = this.props;

		return (
			<InfoContainer active={show}>
				<Header>
					<Language>
						<span onClick={() => this.onChangeLang("SV")}>Svenska</span>
						<span onClick={() => this.onChangeLang("EN")}>English</span>
					</Language>
					<Close>
						<MdClose onClick={onClose} />
					</Close>
				</Header>
				<Text>
					<p>{this.getCorrectTrans("general", "text")}</p>
					<p>
						<Sub>
							<MdGrade />
							{this.getCorrectTrans("rate", "title")}:<br />
						</Sub>
						{this.getCorrectTrans("rate", "text")}
					</p>
					<p>
						<Sub>
							<MdFormatListNumbered />
							{this.getCorrectTrans("leaderboard", "title")}:<br />
						</Sub>
						{this.getCorrectTrans("leaderboard", "text")}
					</p>
					<p>
						<Sub>
							<MdShowChart />
							{this.getCorrectTrans("statistics", "title")}:<br />
						</Sub>
						{this.getCorrectTrans("statistics", "text")}
					</p>
					<p>
						<Sub>
							<MdAccountCircle />
							{this.getCorrectTrans("profile", "title")}:<br />
						</Sub>
						{this.getCorrectTrans("profile", "text")}
					</p>
					{isAdmin ? (
						<p>
							<Sub>
								<MdSupervisorAccount />
								{this.getCorrectTrans("admin", "title")}:<br />
							</Sub>
							{this.getCorrectTrans("admin", "text")}
						</p>
					) : (
						""
					)}
				</Text>
			</InfoContainer>
		);
	}
}

const InfoContainer = styled.div`
	background-color: ${colors.grayish()};
	bottom: 0;
	color: #fff;
	left: 0;
	position: fixed;
	opacity: ${props => (props.active ? "1" : "0")};
	padding: 50px 20px 20px 20px;
	right: 0;
	top: 0;
	overflow-y: auto;
	pointer-events: ${props => (props.active ? "all" : "none")};
	transition: opacity 150ms ease-out;
	z-index: 6;
`;

const Header = styled.div`
	margin-bottom: 30px;
`;

const Language = styled.div`
	span {
		background-color: ${colors.navish()};
		color: #fff;
		margin-right: 10px;
		padding: 10px 20px;

		:last-child {
			margin-right: 0;
		}
	}
`;

const Close = styled.div`
	svg:first-child {
		color: #fff;
		font-size: 30px;
		position: fixed;
		right: 20px;
		top: 40px;
		z-index: 5;
	}
`;

const Text = styled.div`
	line-height: 1.3;
`;

const Sub = styled.span`
	color: ${colors.dirtpinkish()};
	font-size: 18px;
	margin-bottom: 5px;

	svg {
		margin-right: 5px;
	}
`;

export default Information;
