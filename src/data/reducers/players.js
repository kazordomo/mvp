import { Record, Map } from 'immutable';
import Player from '../models/player';
import { playerTypes } from '../actions/types';

const initialState = new Record(
	{
		isFetching: false,
		entities: new Map(),
	},
	'players',
);

const addPlayers = (state, { payload }) => {
	let { entities } = state;

	payload.forEach(player => {
		entities = entities.set(player.id, new Player(player));
	});

	return state.set('entities', entities).set('isFetching', false);
};

const players = (state = initialState(), action) => {
	switch (action.type) {
		case playerTypes.FETCH_REQUEST:
			return state.set('isFetching', true);
		case playerTypes.FETCH_SUCCESS:
			return addPlayers(state, action);

		default:
			return state;
	}
};

export default players;
