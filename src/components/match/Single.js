import React from 'react';
import { useSelector } from 'react-redux';

import * as selectors from '../../data/selectors/matches';

const SingleMatch = props => {
	const match = useSelector(state =>
		selectors.getSingleMatch(state, { id: props.match.params.id }));

	return <div>{match.opponents}</div>
}

export default SingleMatch;