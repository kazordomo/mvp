import React, { Component } from 'react';
import * as firebase from 'firebase';
import keys from './config/keys';
import uuid from 'uuid';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getById, updateById, setById } from './firebase/fetch';
import { isEmptyObj } from './utils';
import { 
	populatePlayers, 
	populateUsers, 
	populateRatingOccasions 
} from './actions';

import Login from './components/login/Login';
import Admin from './components/admin/Admin';
import Profile from './components/profile/Profile';
import Home from './components/home/Home';
import Rate from './components/rate/Rate';
import Leaderboard from './components/leaderboard/Leaderboard';
import Statistics from './components/statistics/Statistics';
import Loading from './components/_shared/Loading';

// TODO: Handle errors.

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isFetching: true,
			user: {},
			users: [],
			players: [],
			ratingOccasions: [],
			isGuest: false,
		}
	}

	async componentDidMount() {
		// Regsiter fb-app. If already registered - skip.
		if (!firebase.apps.length)
			firebase.initializeApp(keys.firebaseConfig);

		// This func gets called when the app is fired up or when a user signs in/out.
		firebase.auth().onAuthStateChanged(async user => {
			if (user) {
				const idTokenResult = await user.getIdTokenResult();
				const snapshot = await getById('users', user.uid);
				const userData ={
					...snapshot.data(),
					admin: idTokenResult.claims.admin ? idTokenResult.claims.admin : false,
				};
				this.setState({ user: userData, isFetching: true }, this.populateData);
			}
			else {
				this.setState({ isFetching: false, user: {} }, this.populateData);
			}
		});
	}

	async populateData() {
		const [users, players, ratingOccasions] = await Promise.all([
			populateUsers(),
			populatePlayers(),
			populateRatingOccasions(),
		]);
		// Because we're waiting for the fetch to succeed, we can use the players array directly from here.
		this.setState({ users, players, ratingOccasions, isFetching: false });
	}

	getActiveRatingOccasion = () => this.state.ratingOccasions.find(occasion => occasion.active);
	// If the player/person got an account, we will use the user.id when we enter the profile. Otherwise we will use the player.id/nr.
	getProfileId = nr => {
		const user = this.state.users.find(user => parseInt(user.playerNumber) === nr);
		return user ? user.id : nr;
	}
	
	onOpenRating = async opponents => {
		try {
			const id = uuid();
			// Get the last rounds "round-number" and add 1. If first round - use 1 instead of 0.
			const round = this.state.ratingOccasions.length ? 
				(this.state.ratingOccasions.sort((a, b) => b.round - a.round)[0].round + 1) : 1;

			const newRatingOccasion = {
				id,
				opponents,
				round,
				active: true,
			}
			await setById('ratingOccasions', id, newRatingOccasion);
			this.setState({ ratingOccasions: [ ...this.state.ratingOccasions, newRatingOccasion ] });
		} catch(err) {
			console.log(err);
		}
	}

	onCloseRating = async () => {
		try {
			// TODO: map
			let ratingOccasions = [ ...this.state.ratingOccasions ];
			let ratingOccasion = this.getActiveRatingOccasion();
			ratingOccasion.active = false;
			ratingOccasions[ratingOccasions.indexOf(ratingOccasion)] = ratingOccasion;
			await updateById('ratingOccasions', ratingOccasion.id, ratingOccasion);
			this.setState({ ratingOccasions });
		} catch(err) {
			console.log(err);
		}
	}

	enterAsGuest = () => this.setState({ isGuest: true });

	render() {
		if (this.state.isFetching)
            return <Loading />
		
		if (isEmptyObj(this.state.user) && !this.state.isGuest)
			return <Login onEnterAsGuest={this.enterAsGuest} />

		return (
			<Router>
				<AppContainer>
					<Route exact path='/' render={() => 
						<Home user={this.state.user} ratingOccasion={this.getActiveRatingOccasion()} />
					}/>
					<Route path='/profile/:id' render={props => 
						<Profile {...props} users={this.state.users} players={this.state.players} />
					}/>
					<Route path='/rate' render={() => 
						<Rate user={this.state.user} players={this.state.players} ratingOccasion={this.getActiveRatingOccasion()}/>
					}/>
					<Route path='/leaderboard' render={() => 
						<Leaderboard players={this.state.players} getProfileId={this.getProfileId} />
					}/>
					<Route path='/statistics' render={() => 
						<Statistics 
							players={this.state.players} 
							users={this.state.users} 
							ratingOccasions={this.state.ratingOccasions} 
						/>
					}/>
					<Route path='/admin' render={() => 
						<Admin 
							user={this.state.user}
							ratingOccasion={this.getActiveRatingOccasion()}
							onOpenRating={this.onOpenRating}
							onCloseRating={this.onCloseRating}
						/>
					}/>
				</AppContainer>
			</Router>
		)
	}
}

const AppContainer = styled.div`
	font-family: 'Josefin Sans', sans-serif;
`;

export default App;
