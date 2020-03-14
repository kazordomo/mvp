import * as firebase from 'firebase';
import keys from '../../config/keys';

import { getById, setById } from '../../firebase/fetch';

import { appTypes } from './types';

const requestUser = () => ({
	type: appTypes.FETCH_USER_REQUEST
});

export const setUser = payload => ({
	type: appTypes.FETCH_USER_SUCCESS,
	payload
})

export const dbInit = () => async dispatch => {
	dispatch(requestUser());

	// Regsiter fb-app. If already registered - skip.
	if (!firebase.apps.length) firebase.initializeApp(keys.firebaseConfig);

	// This func gets called when the app is fired up or when a user signs in/out.
	firebase.auth().onAuthStateChanged(async user => {
		if (!user) return dispatch(setUser(0));

		const idTokenResult = await user.getIdTokenResult();
		const snapshot = await getById('users', user.uid);
		const userData = {
			...snapshot.data(),
			admin: idTokenResult.claims.admin ? idTokenResult.claims.admin : false,
		};

		dispatch(setUser(userData.id));
	});
}

export const registerUser = userValues => async dispatch => {
	const cred = await firebase
		.auth()
		.createUserWithEmailAndPassword(userValues.email, userValues.pass);

	// Creates a user in the users schema, using the unique ID gotten from the authed user.
	await setById('users', cred.user.uid, {
		id: cred.user.uid,
		admin: false,
		name: userValues.name,
		playerNumber: userValues.playerNumber,
		createdAt: new Date(),
	});

	dispatch(setUser(cred.user.uid));

	return cred;
}


export const loginUser = (email, pass) => async dispatch => {
	const cred = await firebase
		.auth()
		.signInWithEmailAndPassword(email, pass);

	dispatch(setUser(cred.user.uid));

	return cred;
}