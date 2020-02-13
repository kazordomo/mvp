import React, { memo } from 'react';
import styled from 'styled-components';

import colors from '../../assets/colors';

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

const RatingButton = memo(({ value }) => {
	return (
		<CustomButton>{value}</CustomButton>
	);
});

export default RatingButton;