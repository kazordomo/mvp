import React, { Component } from 'react';
import * as firebase from 'firebase';
import { setById } from '../../utils/fetch';
import colors from '../../utils/colors';
import Container from '../_shared/Container'
import CenteredWrapper from '../_shared/CenteredWrapper';
import Button from '../_basic/Button';
import Input from '../_basic/Input';

class Login extends Component {

    state = {
        register: true,
        redirectToReferrer: false,
    }

    onSubmit = e => {
        e.preventDefault();
        if (this.state.register)
            this.register();
        else
            this.login();
    }

    register = async () => {
        const { email, password, retypePass, firstName, } = this.getFormValues();

        if (!this.passwordCheck(password, retypePass)) 
            return console.log('The passwords did not match!');

        try {
            const cred = await firebase.auth().createUserWithEmailAndPassword(email, password);
            // Creates a user in the users schema, using the unique ID gotten from the authed user.
            await setById('users', cred.user.uid, { id: cred.user.uid, name: firstName, ratings: [], });
            this.setState({ redirectToReferrer: true })
        } catch(err) {
            // TODO: Handle error.
            console.log(err);
        }
    }

    login = async () => {
        const { email, password } = this.getFormValues();

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch(err) {
            // TODO: Handle error.
            console.log(err);
        }
    }

    onChangeAuth = () => {
        this.setState(prevState => { return { register: !prevState.register } }, () => {
            document
                .querySelector('#retypePassword')
                .style.display = this.state.register ? 'block' : 'none';
            document
                .querySelector('#firstName')
                .style.display = this.state.register ? 'block' : 'none';
            document
                .querySelector('#authCode')
                .style.display = this.state.register ? 'block' : 'none';
        });
    }

    // Will not be used in prod.
    signOut = async e => {
        e.preventDefault();
        await firebase.auth().signOut();
        console.log('The user has signed out');
    }

    getFormValues() {
        return {
            email: document.querySelector('#email').value,
            password: document.querySelector('#password').value,
            retypePass: document.querySelector('#retypePassword').value,
            firstName: document.querySelector('#firstName').value,
            authCode: document.querySelector('#authCode').value,
        }
    }

    passwordCheck = (p1, p2) => p1 === p2; 

    render() {

        const { register } = this.state;

        return (
            <Container brColor={colors.spacegrayish()} style={{height: '100vh'}}>
                <CenteredWrapper>
                    <form>
                        <Input type="email" id="email" placeholder="someone@example.com" />
                        <Input type="text" id="firstName" placeholder="Förnamn" />
                        <Input type="text" id="authCode" placeholder="Lösenkod" />
                        <Input type="password" id="password" placeholder="Lösenord" />
                        <Input type="password" id="retypePassword" placeholder="Lösenord igen" />
                        <Button long onClick={this.onSubmit}>{ register ? 'Registrera' : 'Logga in' }</Button>
                        <div id="changeAuth">
                            <p onClick={this.onChangeAuth}>{ register ? 'Du har redan ett konto?' : 'Inge konto?' }</p>
                        </div>
                    </form>
                </CenteredWrapper>
            </Container>
        )
    }
}

export default Login;