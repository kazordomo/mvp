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

// TODO: Setup rules so that everyone can check the leaderboard and stats, but onlt logged in
// users will be able to see and use the rating.

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isLoggedIn: true,
			isFetching: true,
			players: [],
		}
	}

	async componentDidMount() {
		if (!firebase.apps.length)
			firebase.initializeApp(keys.firebaseConfig);

		// This func gets called every time a user logs in/logs out.
		firebase.auth().onAuthStateChanged(user => console.log(user));

		const initPlayers = [];
		const snapshot = await firebase.firestore().collection('players').get();
		snapshot.forEach(doc => initPlayers.push({ id: doc.id, ...doc.data() }));
		this.setState({ players: initPlayers, isFetching: false });
		// firebase.firestore().collection('players').onSnapshot(snapshot => {
		// });
    }

	render() {
		if (this.state.isFetching)
            return <Loading />

		if (!this.state.isLoggedIn)
			return <Login />

		return (
			<Router>
				<AppContainer>
					<Route exact path='/' component={Home}/>
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
