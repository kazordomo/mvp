import React, { useEffect, useState } from 'react';
import { batch, useDispatch } from 'react-redux';
import * as firebase from 'firebase';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import keys from './config/keys';
import { getById, updateById, setById } from './firebase/fetch';
import actions from './data/actions';
import Login from './components/login/Login';
import Admin from './components/admin/Admin';
import Profile from './components/profile/Profile';
import Home from './components/home/Home';
import Rate from './components/rate/Rate';
import Leaderboard from './components/leaderboard/Leaderboard';
import Statistics from './components/statistics/Statistics';
import Loading from './components/_shared/Loading';

const App = () => {
	const dispatch = useDispatch();

	// remove
	const players = [];
	const ratingOccasions = [];

	const [isFetching, setIsFetching] = useState(false);
	// @todo: store in redux state - users.*
	const [users, setUsers] = useState(null);
	// @todo: store in redux state - app.user or something
	const [user, setUser] = useState(null);
	const [isGuest, setIsGuest] = useState(null);

	useEffect(() => {
		(async () => {
			await firebaseInit();
			fetchData();
		})()
	}, [])

	const firebaseInit = async () => {
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
			setUser(userData);
		});
	}

	const fetchData = () => {
		batch(() => {
			dispatch(actions.players.fetchPlayers());
			dispatch(actions.ratingOccasions.fetchRatingOccasions());
		});
	}

	const getActiveRatingOccasion = () => ratingOccasions.find(occasion => occasion.active);

	// If the player/person got an account, we will use the user.id when we enter the profile. Otherwise we will use the player.id/nr.
	const getProfileId = nr => {
		const user = users.find(user => parseInt(user.playerNumber) === nr);
		return user ? user.id : nr;
	};

	const onOpenRating = async opponents => {
		try {
			const id = 1;
			// Get the last rounds "round-number" and add 1. If first round - use 1 instead of 0.
			const round = ratingOccasions.length
				? ratingOccasions.sort((a, b) => b.round - a.round)[0].round + 1
				: 1;

			const newRatingOccasion = {
				id,
				opponents,
				round,
				active: true,
			};
			await setById('ratingOccasions', id, newRatingOccasion);

			// open rating
		} catch (err) {
			console.log(err);
		}
	};

	const onCloseRating = async () => {
		try {
			// TODO: map
			const ratingOccasions = [ratingOccasions];
			const ratingOccasion = this.getActiveRatingOccasion();
			ratingOccasion.active = false;
			ratingOccasions[ratingOccasions.indexOf(ratingOccasion)] = ratingOccasion;
			await updateById('ratingOccasions', ratingOccasion.id, ratingOccasion);

			// close rating
		} catch (err) {
			console.log(err);
		}
	};

	const enterAsGuest = () => setIsGuest(true);

	if (isFetching) return <Loading />;

	return (
		<Router>
			<AppContainer>
				<Route
					exact
					path="/"
					render={() => <Home user={user} ratingOccasion={null} />}
				/>
				<Route
					path="/profile/:id"
					render={props => <Profile {...props} users={users} players={players} />}
				/>
				<Route
					path="/rate"
					render={() => (
						<Rate
							user={user}
							players={players}
							ratingOccasion={null}
						/>
					)}
				/>
				<Route path="/leaderboard" render={() => <Leaderboard getProfileId={null} />} />
				<Route
					path="/statistics"
					render={() => (
						<Statistics
							players={players}
							users={users}
							ratingOccasions={ratingOccasions}
						/>
					)}
				/>
				<Route
					path="/admin"
					render={() => (
						<Admin
							user={user}
							ratingOccasion={null}
							onOpenRating={null}
							onCloseRating={null}
						/>
					)}
				/>
			</AppContainer>
		</Router>
	);
}

const AppContainer = styled.div`
	font-family: 'Josefin Sans', sans-serif;
`;

export default App;
