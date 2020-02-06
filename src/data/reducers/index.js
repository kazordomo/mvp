import { combineReducers } from 'redux';

import app from './app';
import players from './players';
import ratingOccasions from './ratingOccasions';

export default combineReducers({
	app,
	players,
	ratingOccasions,
});
