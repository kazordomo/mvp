import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import * as selectors from '../../data/selectors/matches';

const ListMatch = () => {
	const matches = useSelector(state => selectors.getMatchesAsList(state));

	return matches.map(match => (
		<div key={match.id}>
			<Link
				to={`/matches/${match.id}`}>
				{match.opponents}
			</Link>
		</div>
	))
}

export default ListMatch;