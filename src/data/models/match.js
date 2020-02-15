import { Record, Map } from 'immutable';

export default Record(
	{
		id: 0,
		opponents: '',
		active: false,
		round: 0,
		ratings: [],
	},
	'match',
);