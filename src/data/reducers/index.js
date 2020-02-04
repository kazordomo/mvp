import { combineReducers } from 'redux';

import players from './players';
import ratingOccasions from './ratingOccasions';

export default combineReducers({
	players,
	ratingOccasions,
});
