import { combineReducers } from 'redux';

import app from './app';
import users from './users';
import players from './players';
import ratingOccasions from './ratingOccasions';
import ratings from './ratings';

export default combineReducers({
	app,
	users,
	players,
	ratingOccasions,
	ratings,
});
