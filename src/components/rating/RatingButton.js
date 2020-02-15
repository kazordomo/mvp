import React, { memo } from 'react';
import styled from 'styled-components';
import { MdLock } from 'react-icons/md'

const CustomButton = styled.div`
    align-items: center;
    display: flex;
	font-size: 16px;
	font-weight: 600;
    justify-content: center;
    height: 80px;
    width: 75px;

    svg {
        font-size: 20px;
    }
`;

export default memo(({ value, disabled, handleRate }) => (
	disabled ? <CustomButton><MdLock /></CustomButton> :
		<CustomButton onClick={handleRate}>
			{value}
		</CustomButton>
))