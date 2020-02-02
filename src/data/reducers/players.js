import { Record, Map } from 'immutable';
import Player from '../models/player';
import { playerTypes } from '../actions/types';

const initialState = new Record(
	{
		entities: new Map(),
	},
	'players',
);

const addPlayers = (state, { payload }) => {
	let { entities } = state;

	payload.forEach(player => {
		entities = entities.set(player.id, new Player(player));
	});

	return state.set('entities', entities);
};

const players = (state = initialState(), action) => {
	switch (action.type) {
		case playerTypes.SET_ITEMS:
			return addPlayers(state, action);

		default:
			return state;
	}
};

export default players;
