import React, { Component } from 'react';
import * as firebase from 'firebase';
import keys from './config/keys';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
			isLoggedIn: true,
			players: {},
		}
	}

	componentDidMount() {
		if(!firebase.apps.length)
			firebase.initializeApp(keys.firebaseConfig);

        firebase
            .database()
            .ref('players')
            .once('value')
            .then(snapshot => this.setState({ players: snapshot.val(), isLoading: false, }))
            .catch(err => console.log(err));
    }

	render() {
		if(this.state.isLoading)
            return <Loading />

		if(!this.state.isLoggedIn)
			return <Login />

		return (
			<Router>
				<div>
					<Route exact path='/' component={Home}/>
					<Route path='/rate' render={() => <Rate players={this.state.players} />}/>
					<Route path='/leaderboard' render={() => <Leaderboard players={this.state.players} />}/>
					<Route path='/statistics' render={() => <Statistics />}/>
				</div>
			</Router>
		)
	}
}

export default App;
