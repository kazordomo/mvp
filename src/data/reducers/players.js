import { Record, Map } from 'immutable';
import Player from '../models/player';
import { playerTypes } from '../actions/types';

const initialState = new Record(
	{
		entities: new Map(),
	},
	'players',
);

const players = (state = initialState(), action) => {
	switch (action.type) {
		case playerTypes.SET_ITEMS:
			let newEntities = state.entities;

			for (const player of action.payload.values()) {
				newEntities = newEntities.set(player.id, new Player(player));
			}

			return state.set('entities', newEntities);

		default:
			return state;
	}
};

export default players;
