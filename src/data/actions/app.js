import * as firebase from 'firebase';
import keys from '../../config/keys';
import { getById } from '../../firebase/fetch';
import { appTypes } from './types';

const requestUser = () => ({
	type: appTypes.FETCH_USER_REQUEST
});

const setUser = payload => ({
	type: appTypes.FETCH_USER_SUCCESS,
	payload
})

export const dbInit = () => async dispatch => {
	dispatch(requestUser());

	// Regsiter fb-app. If already registered - skip.
	if (!firebase.apps.length) firebase.initializeApp(keys.firebaseConfig);

	// This func gets called when the app is fired up or when a user signs in/out.
	firebase.auth().onAuthStateChanged(async user => {
		if (!user) return;

		const idTokenResult = await user.getIdTokenResult();
		const snapshot = await getById('users', user.uid);
		const userData = {
			...snapshot.data(),
			admin: idTokenResult.claims.admin ? idTokenResult.claims.admin : false,
		};

		dispatch(setUser(userData.id));
	});
}