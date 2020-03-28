import styled from "styled-components";
import { defaultStyle } from "./Button";

import colors from "../../assets/colors";

export default styled.input(
	{
		...defaultStyle,
	},
	props => ({
		backgroundColor: colors.orangeish(),
		borderRadius: "2px",
		opacity: props.disabled ? 0.35 : 1,
		width: "100%",
	})
);
