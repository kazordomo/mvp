import * as firebase from 'firebase';

export const getAll = collection => firebase.firestore().collection(collection).get();
export const getById = (collection, id) => firebase.firestore().collection(collection).doc(id).get();
export const updateById = (collection, id, obj) => firebase.firestore().collection(collection).doc(id).update(obj);
export const setById = (collection, id, obj) => firebase.firestore().collection(collection).doc(id).set(obj);
export const signOut = () => firebase.auth().signOut();