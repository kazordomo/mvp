import React, { Component } from 'react';
import * as firebase from 'firebase';
import keys from './config/keys';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import Login from './components/login/Login';
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
			players: [],
		}
	}

	async componentDidMount() {
		if (!firebase.apps.length)
			firebase.initializeApp(keys.firebaseConfig);

		// This func gets called when the app is fired up or when a user signs in/out.
		firebase.auth().onAuthStateChanged(async user => {
			if (user) {
				const idTokenResult = await user.getIdTokenResult();
				const snapshot = await firebase.firestore().collection('users').doc(user.uid).get();
				const userData ={
					...snapshot.data(),
					isAdmin: idTokenResult.claims.admin ? idTokenResult.claims.admin : false,
				};
				this.setState({ 
					isLoggedIn: true, 
					user: userData,
				}, this.populatePlayers);
			}
			else
				this.setState({ isFetching: false });
		});

		// firebase.auth().signOut();
	}

	async populatePlayers() {
		const initPlayers = [];
		const snapshot = await firebase.firestore().collection('players').get();
		snapshot.forEach(doc => initPlayers.push({ id: doc.id, ...doc.data() }));
		this.setState({ players: initPlayers, isFetching: false });
	}

	onAddAdminRole = email => {
        const addAdminRole = firebase.functions().httpsCallable('addAdminRole');
        if (!email)
            return console.log('Skriv en e-post!');
        addAdminRole({ email }).then(result => {
            console.log(result);
        }).catch(err => console.log(err));
    }

	render() {
		if (this.state.isFetching)
            return <Loading />
		
		if (!this.state.isLoggedIn)
			return <Login />

		return (
			<Router>
				<AppContainer>
					<Route exact path='/' render={() => <Home onAddAdminRole={this.onAddAdminRole} user={this.state.user} />} />
					<Route path='/rate' render={() => <Rate players={this.state.players} />}/>
					<Route path='/leaderboard' render={() => <Leaderboard players={this.state.players} />}/>
					<Route path='/statistics' render={() => <Statistics />}/>
				</AppContainer>
			</Router>
		)
	}
}

const AppContainer = styled.div`
	font-family: 'Josefin Sans', sans-serif;
`;

export default App;
