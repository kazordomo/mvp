import React from "react";
import styled from "styled-components";
import { MdChevronLeft } from "react-icons/md";
import { Link } from "react-router-dom";

export default ({ goBack, title }) => {
	return (
		<Nav>
			{goBack ? (
				<a>
					<MdChevronLeft onClick={goBack} />
				</a>
			) : (
				<Link to="/">
					<MdChevronLeft />
				</Link>
			)}
			<h2>{title}</h2>
		</Nav>
	);
};

const Nav = styled.nav`
	color: #fff;
	height: 75px;
	line-height: 75px;
	padding: 20px 0;
	position: relative;
	text-align: center;

	a {
		color: #fff;
		position: absolute;
		left: 0;
		top: 62%;
		text-align: left;
		transform: translateY(-50%);
		width: 0;
		svg {
			font-size: 44px;
		}
	}

	h2 {
		margin: 0;
	}
`;
