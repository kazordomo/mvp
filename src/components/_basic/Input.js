import React, { memo, forwardRef, useState } from "react";
import styled from "styled-components";

const Input = styled.input`
	background-color: transparent;
	border: none;
	border-radius: 2px;
	outline: none;
	padding: 20px 15px;
	width: 90%;
`;

const Wrapper = styled.div`
	background-color: rgba(0, 0, 0, 0.2);
	border-radius: 2px;
	align-items: center;
	display: flex;
	flex-direction: row;
	margin-bottom: 5px;
	position: relative;
	border: 1px solid
		${props => (props.focused ? props.color || "#fff" : "transparent")};
	transition: border 150ms ease-in-out;

	&:last-of-type {
		margin-bottom: 10px;
	}

	${Input} {
		color: ${props => props.color || "#fff"};
	}
`;

const Icon = styled.div`
	padding: 0 15px;
	width: 10%;

	svg {
		font-size: 35px;
	}
`;

export default memo(
	forwardRef((props, ref) => {
		const { icon, color, onFocus, onBlur, ...inputProps } = props;

		const [isFocused, setIsFocused] = useState(false);

		const handleFocus = e => {
			onFocus && onFocus(e);
			setIsFocused(true);
		};

		const handleBlur = e => {
			onBlur && onBlur(e);
			setIsFocused(false);
		};

		return (
			<Wrapper focused={isFocused} color={color}>
				<Icon>{props.icon}</Icon>
				<Input
					ref={ref}
					onFocus={handleFocus}
					onBlur={handleBlur}
					{...inputProps}
				/>
			</Wrapper>
		);
	})
);
