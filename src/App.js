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
				const snapshot = await firebase.firestore().collection('users').doc(user.uid).get();
				this.setState({ isLoggedIn: true, user: snapshot.data() }, this.populatePlayers);
			}
			else
				this.setState({ isFetching: false });
		});

		setTimeout(() => console.log(this.state.user), 3000);

		// firebase.auth().signOut();
	}

	async populatePlayers() {
		const initPlayers = [];
		const snapshot = await firebase.firestore().collection('players').get();
		snapshot.forEach(doc => initPlayers.push({ id: doc.id, ...doc.data() }));
		this.setState({ players: initPlayers, isFetching: false });
	}

	render() {
		if (this.state.isFetching)
            return <Loading />
		
		if (!this.state.isLoggedIn)
			return <Login />

		return (
			<Router>
				<AppContainer>
					<Route exact path='/' render={() => <Home isLoggedIn={this.state.isLoggedIn} />} />
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
