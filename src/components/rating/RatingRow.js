import React, { memo } from 'react';
import styled from 'styled-components';

import RatingButton from './RatingButton';

const Buttons = styled.div`
	display: flex;
	flex-direction: row;

	div {
		flex: 1;
	}
`;

const RatingRow = memo(({ player }) => {

	return (
		<>
			<div>{player.name}</div>
			<Buttons>
				<RatingButton value={1} />
				<RatingButton value={2} />
				<RatingButton value={3} />
			</Buttons>
		</>
	)
});

export default RatingRow;
