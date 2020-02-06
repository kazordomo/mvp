import { appTypes } from './types';

export const setActiveUser = payload => ({
	type: appTypes.SET_ACTIVE_USER,
	payload
});