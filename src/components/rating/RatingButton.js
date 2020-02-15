import React, { memo } from 'react';
import styled from 'styled-components';

const CustomButton = styled.div`
    align-items: center;
	background-color: red;
    display: flex;
	font-size: 16px;
    justify-content: center;
    height: 80px;
    width: 75px;

    svg {
        font-size: 20px;
    }
`;

export default memo(({ value, disabled, handleRate }) => (
	disabled ? <div>disabled</div> :
		<CustomButton onClick={handleRate}>
			{value}
		</CustomButton>
))