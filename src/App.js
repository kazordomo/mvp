import React, { useEffect, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getById, updateById, setById } from './firebase/fetch';
import actions from './data/actions';
import selectors from './data/selectors';
import Login from './components/login/Login';
import Admin from './components/admin/Admin';
import Profile from './components/profile/Profile';
import Home from './components/home/Home';
import Rate from './components/rate/Rate';
import Leaderboard from './components/leaderboard/Leaderboard';
import Statistics from './components/statistics/Statistics';
import RatingOccasion from './components/statistics/RatingOccasion';
import Loading from './components/_shared/Loading';

import { getActiveUser } from './data/selectors/app';

const App = () => {
	const dispatch = useDispatch();

	const isAppFetching = useSelector(state => selectors.app.getIsFetching(state));
	const isUsersFetching = useSelector(state => selectors.users.getIsFetching(state));
	const isPlayersFetching = useSelector(state => selectors.players.getIsFetching(state));
	const isRatingOccasionsFetching = useSelector(state => selectors.ratingOccasions.getIsFetching(state));

	// remove
	const players = [];
	const ratingOccasions = [];
	const users = [];
	const activeUser = useSelector(state => getActiveUser(state)); // @todo: change old "user" to "activeUser"

	useEffect(() => {
		fetchData();
	}, [])

	const fetchData = () => {
		batch(() => {
			dispatch(actions.app.dbInit());
			dispatch(actions.users.fetchUsers());
			dispatch(actions.players.fetchPlayers());
			dispatch(actions.ratingOccasions.fetchRatingOccasions());
		});
	}

	if (
		isAppFetching ||
		isUsersFetching ||
		isPlayersFetching ||
		isRatingOccasionsFetching
	) return <Loading />;

	return (
		<Router>
			<AppContainer>
				<Route
					exact
					path="/"
					component={Home}
				/>
				<Route
					path="/profile/:id"
					render={props => <Profile {...props} />}
				/>
				<Route
					path="/rate"
					render={() => (
						<Rate
							user={activeUser}
							players={players}
							ratingOccasion={null}
						/>
					)}
				/>
				<Route path="/leaderboard" component={Leaderboard} />
				<Route
					exact
					path="/statistics"
					component={Statistics}
				/>
				<Route
					exact
					path="/statistics/:id"
					render={props => (
						<RatingOccasion
							{...props} />
					)}
				/>
				<Route
					path="/admin"
					component={Admin}
				/>
			</AppContainer>
		</Router>
	);
}

const AppContainer = styled.div`
	font-family: 'Josefin Sans', sans-serif;
`;

export default App;
