import * as firebase from "firebase";

export const getDoc = (collection, id) =>
	firebase
		.firestore()
		.collection(collection)
		.doc(id);
export const getAll = collection =>
	firebase
		.firestore()
		.collection(collection)
		.get();
export const getById = (collection, id) =>
	firebase
		.firestore()
		.collection(collection)
		.doc(id)
		.get();
export const updateById = (collection, id, data) =>
	firebase
		.firestore()
		.collection(collection)
		.doc(id)
		.update(data);
export const setById = (collection, id, data) =>
	firebase
		.firestore()
		.collection(collection)
		.doc(id)
		.set(data);
export const signOut = () => firebase.auth().signOut();
