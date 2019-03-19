import React, { Component } from 'react';
import * as firebase from 'firebase';
import keys from './config/keys';
import uuid from 'uuid';
import { getAll, getById, updateById, setById, signOut } from './utils/fetch';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import Login from './components/login/Login';
import Admin from './components/admin/Admin';
import Profile from './components/profile/Profile';
import Home from './components/home/Home';
import Rate from './components/rate/Rate';
import Leaderboard from './components/leaderboard/Leaderboard';
import Statistics from './components/statistics/Statistics';
import Loading from './components/_shared/Loading';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isLoggedIn: false,
			isFetching: true,
			user: false,
			users: [],
			players: [],
			ratingOccasions: [],
		}
	}

	async componentDidMount() {
		if (!firebase.apps.length)
			firebase.initializeApp(keys.firebaseConfig);

		// This func gets called when the app is fired up or when a user signs in/out.
		firebase.auth().onAuthStateChanged(async user => {
			if (user) {
				const idTokenResult = await user.getIdTokenResult();
				const snapshot = await getById('users', user.uid);
				const userData ={
					...snapshot.data(),
					isAdmin: idTokenResult.claims.admin ? idTokenResult.claims.admin : false,
				};
				this.setState({ 
					isLoggedIn: true, 
					user: userData,
				}, this.populateData);
			}
			else
				this.setState({ isFetching: false });
		});

	}

	async populateData() {
		const [users, players, ratingOccasions] = await Promise.all([
			this.populateUsers(),
			this.populatePlayers(),
			this.populateRatingOccasions(),
		]);
		this.setState({ users, players, ratingOccasions, isFetching: false });
	}

	async populateUsers() {
		const initUsers = [];
		const snapshot = await getAll('users');
		snapshot.forEach(doc => initUsers.push({ id: doc.id, ...doc.data() }));
		return initUsers;
	}

	async populatePlayers() {
		const initPlayers = [];
		const snapshot = await getAll('players');
		snapshot.forEach(doc => initPlayers.push({ id: doc.id, ...doc.data() }));
		return initPlayers;
	}

	async populateRatingOccasions() {
		const initRatingOccasions = [];
		const snapshot = await getAll('ratingOccasions');
		snapshot.forEach(doc => initRatingOccasions.push({ id: doc.id, ...doc.data() }));
		return initRatingOccasions;
	}

	getActiveRatingOccasion = () => this.state.ratingOccasions.find(occasion => occasion.active);

	onSignOut = () => {
		signOut();
		this.setState({ isLoggedIn: false });
	}

	onAddAdminRole = email => {
        const addAdminRole = firebase.functions().httpsCallable('addAdminRole');
        if (!email)
            return console.log('Skriv en e-post!');
        addAdminRole({ email }).then(result => {
            console.log(result);
        }).catch(err => console.log(err));
	}
	
	onOpenRating = async opponents => {
		try {
			const id = uuid();
			const round = this.state.ratingOccasions.length ? 
				(this.state.ratingOccasions.sort((a, b) => b.round - a.round)[0].round + 1) : 1;

			const newRatingOccasion = {
				id,
				opponents,
				round,
				active: true,
			}
			await setById('ratingOccasions', id, newRatingOccasion);
			this.setState({ 
				ratingOccasions: [ ...this.state.ratingOccasions, newRatingOccasion ]
			});
		} catch(err) {
			console.log(err);
		}
	}

	onCloseRating = async () => {
		try {
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

	render() {
		if (this.state.isFetching)
            return <Loading />
		
		if (!this.state.isLoggedIn)
			return <Login />

		return (
			<Router>
				<AppContainer>
					<Route exact path='/' render={() => <Home user={this.state.user} ratingOccasion={this.getActiveRatingOccasion()} onSignOut={this.onSignOut} />} />
					<Route path='/profile/:id' render={props => <Profile {...props} users={this.state.users} />}/>
					<Route path='/rate' render={() => <Rate user={this.state.user} players={this.state.players} ratingOccasion={this.getActiveRatingOccasion()}/>}/>
					<Route path='/leaderboard' render={() => <Leaderboard players={this.state.players} />}/>
					<Route path='/statistics' render={() => <Statistics players={this.state.players} ratingOccasions={this.state.ratingOccasions} />}/>
					<Route path='/admin' render={() => 
						<Admin 
							onAddAdminRole={this.onAddAdminRole} 
							user={this.state.user}
							ratingOccasion={this.getActiveRatingOccasion()}
							onOpenRating={this.onOpenRating}
							onCloseRating={this.onCloseRating}
						/>}
					/>
				</AppContainer>
			</Router>
		)
	}
}

const AppContainer = styled.div`
	font-family: 'Josefin Sans', sans-serif;
`;

export default App;
