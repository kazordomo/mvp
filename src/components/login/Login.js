import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import CenteredWrapper from '../_shared/CenteredWrapper';
import brImage from '../../images/broddshow.jpeg';
import ImageBr from '../_shared/ImageBr';
import GradientBr from '../_shared/GradientBr';
import Animation from '../_shared/Animation';
import Button from '../_basic/Button';
import Input from '../_basic/Input';

class Login extends Component {

    state = {
        register: true,
        redirectToReferrer: false,
    }

    componentDidMount() {
        document
            .querySelector('form')
            .addEventListener('submit', this.onSubmit);

        document.querySelector('#changeAuth')
            .addEventListener('click', () => {
                this.setState(prevState => { return { register: !prevState.register } }, () => {
                    document
                        .querySelector('#retypePassword')
                        .style.display = this.state.register ? 'block' : 'none';
                });
            })

        document.querySelector('#signOut').addEventListener('click', this.signOut);
    }

    onSubmit = e => {
        e.preventDefault();
        if (this.state.register)
            this.register();
        else
            this.login();
    }

    register = async () => {
        const { email, password, retypePass } = this.getFormValues();

        if (!this.passwordCheck(password, retypePass)) 
            return console.log('The passwords did not match!');

        try {
            const cred = await firebase.auth().createUserWithEmailAndPassword(email, password);
            this.setState({ redirectToReferrer: true });
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
        }
    }

    passwordCheck = (p1, p2) => p1 === p2; 

    render() {

        // if (this.state.redirectToReferrer)
        //     <Redirect to={'/'} />

        const { register } = this.state;
        console.log(register);

        return (
            <div>
                <ImageBr url={brImage} />
                <GradientBr />
                <CenteredWrapper>
                    <Animation type="fadeIn">
                        <form>
                            <Input type="email" id="email" placeholder="someone@example.com" />
                            <Input type="password" id="password" placeholder="Password" />
                            <Input type="password" id="retypePassword" placeholder="Retype Password" />
                            <Button long onClick={this.onRegister}>{ register ? 'Registrera' : 'Logga in' }</Button>
                            <div id="changeAuth">
                                { register ? <p>Du har redan ett konto?</p> : <p>Du har inte ett konto?</p> }
                            </div>
                            <Button id="signOut" onClick={this.signOut}>Logga ut</Button>
                        </form>
                    </Animation>
                </CenteredWrapper>
            </div>
        )
    }
}

export default Login;