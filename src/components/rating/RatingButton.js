import React, { memo } from "react";
import styled from "styled-components";
import { MdLock } from "react-icons/md";

const CustomButton = styled.div`
	align-items: center;
	display: flex;
	font-size: 16px;
	font-weight: 600;
	justify-content: center;
	height: 70px;
	flex: 1;
	background-color: rgba(232, 94, 20, 1);
`;

const SelectedButton = styled(CustomButton)`
	svg {
		font-size: 20px;
	}
`;

export default memo(({ value, disabled, handleRate }) =>
	disabled ? (
		<SelectedButton>
			<MdLock />
		</SelectedButton>
	) : (
		<CustomButton onClick={handleRate}>{value}</CustomButton>
	)
);
