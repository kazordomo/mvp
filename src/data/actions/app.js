import * as firebase from 'firebase';
import keys from '../../config/keys';
import { getById } from '../../firebase/fetch';
import { appTypes } from './types';

export const setActiveUser = payload => ({
	type: appTypes.SET_ACTIVE_USER,
	payload
});

export const dbInit = () => async dispatch => {
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

		dispatch(setActiveUser(userData.id));
	});
}