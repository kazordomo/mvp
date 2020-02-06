import { createSelector } from 'reselect';

export const getUsers = state => state.users.entities;

export const getUsersAsList = createSelector(getUsers, users => users.toList());