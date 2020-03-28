import { createSelector } from "reselect";

import * as userSelectors from "./users";

export const getIsFetching = state => state.app.isFetching;

export const getApp = state => state.app;

export const getActiveUser = createSelector(
	userSelectors.findAll,
	state => state.app.activeUserId,
	(users, activeUserId) => users.get(activeUserId)
);
