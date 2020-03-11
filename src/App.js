import React, { useEffect, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import actions from './data/actions';
import selectors from './data/selectors';

import Auth from './components/auth/Auth';
import Admin from './components/admin/Admin';
import Profile from './components/profile/Profile';
import Home from './components/home/Home';
import Rating from './components/rating/Rating';
import Leaderboard from './components/leaderboard/Leaderboard';
import ListMatch from './components/match/List';
import SingleMatch from './components/match/Single';
import Loading from './components/_shared/Loading';

const App = () => {
	const dispatch = useDispatch();

	const isAppFetching = useSelector(state => selectors.app.getIsFetching(state));
	const isUsersFetching = useSelector(state => selectors.users.getIsFetching(state));
	const isPlayersFetching = useSelector(state => selectors.players.getIsFetching(state));
	const isMatchesFetching = useSelector(state => selectors.matches.getIsFetching(state));

	const activeUserId = useSelector(state => state.app.activeUserId);

	useEffect(() => {
		fetchData();
	}, [])

	const fetchData = () => {
		batch(() => {
			dispatch(actions.app.dbInit());
			dispatch(actions.users.fetchUsers());
			dispatch(actions.players.fetchPlayers());
			dispatch(actions.matches.fetchMatches());
		});
	}

	if (
		isAppFetching ||
		isUsersFetching ||
		isPlayersFetching ||
		isMatchesFetching
	) return <Loading />;

	if (!activeUserId) return <Auth />;

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
					component={Rating}
				/>
				<Route path="/leaderboard" component={Leaderboard} />
				<Route
					exact
					path="/matches"
					component={ListMatch}
				/>
				<Route
					exact
					path="/matches/:id"
					render={props => <SingleMatch {...props} />}
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
