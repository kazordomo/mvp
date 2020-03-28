import styled from "styled-components";

export default styled.div`
	background: url(${props => props.url});
	background-size: cover;
	bottom: 0;
	top: 0;
	right: 0;
	left: 0;
	position: fixed;
`;
