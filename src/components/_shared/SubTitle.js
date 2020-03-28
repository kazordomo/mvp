import styled from "styled-components";

export default styled.h3`
	color: #fff;
	font-size: 20px;
	margin: ${props => (props.noMargin ? 0 : "20px 0")};
`;
