import * as firebase from 'firebase';
import { getAll, getById, updateById, setById, signOut } from './fetch';

export const populateUsers = async () => {
    const initUsers = [];
    const snapshot = await getAll('users');
    snapshot.forEach(doc => initUsers.push({ id: doc.id, ...doc.data() }));
    return initUsers;
}

export const populatePlayers = async () => {
    const initPlayers = [];
    const snapshot = await getAll('players');
    snapshot.forEach(doc => initPlayers.push({ id: doc.id, ...doc.data() }));
    return initPlayers;
}

export const populateRatingOccasions = async () => {
    const initRatingOccasions = [];
    const snapshot = await getAll('ratingOccasions');
    snapshot.forEach(doc => initRatingOccasions.push({ id: doc.id, ...doc.data() }));
    return initRatingOccasions;
}

export const addAdminRole = email => {
    const addAdminRole = firebase.functions().httpsCallable('addAdminRole');
    if (!email) return console.log('Skriv en e-post!');
    addAdminRole({ email }).then(result => {
        console.log(result);
    }).catch(err => console.log(err));
}
