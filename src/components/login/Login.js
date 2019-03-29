import React, { Component } from 'react';
import * as firebase from 'firebase';
import styled  from 'styled-components';
import { setById } from '../../utils/fetch';
import { getFormValues, checkIfValuesMatch } from '../../utils/funcs';
import colors from '../../utils/colors';
import { registerInputs, loginInputs } from './formInputIds';
import Container from '../_shared/Container'
import CenteredWrapper from '../_shared/CenteredWrapper';
import Button from '../_basic/Button';
import Fade from '../_shared/Fade';
import DisplayError from '../_shared/DisplayError';
import DisplayInfo from '../_shared/DisplayInfo';
import FormInputs from './FormInputs';

class Login extends Component {

    state = {
        isRegister: true,
        showInputs: registerInputs,
        errorMsg: '',
        infoMsg: '',
        infoShown: [],
    }

    onSubmit = e => {
        e.preventDefault();
        if (this.state.isRegister)
            this.register();
        else
            this.login();
    }

    register = async () => {
        const { email, password, retypePassword, firstName, playerNumber } = getFormValues(registerInputs);

        if (!checkIfValuesMatch(password, retypePassword))
            return this.setState({ errorMsg: 'The passwords did not match!' });

        try {
            const cred = await firebase.auth().createUserWithEmailAndPassword(email, password);
            // Creates a user in the users schema, using the unique ID gotten from the authed user.
            await setById('users', cred.user.uid, { 
                id: cred.user.uid,
                admin: false,
                name: firstName, 
                playerNumber: playerNumber ? playerNumber : null ,
                ratingOccasions: [],
            });
        } catch(err) {
            this.setState({ errorMsg: err.message });
        }
    }

    login = async () => {
        const { email, password } = getFormValues(loginInputs);

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch(err) {
            this.setState({ errorMsg: err.message });
        }
    }

    onChangeAuth = () => {
        const showInputs = this.state.isRegister ? loginInputs : registerInputs;

        this.setState(prevState => { 
            return {
                isRegister: !prevState.isRegister,
                showInputs,
                infoMsg: '',
            }
        });
    }

    // Will not be used in prod.
    signOut = async e => {
        e.preventDefault();
        await firebase.auth().signOut();
        console.log('The user has signed out');
    }

    // TODO: popup hoc
    displayInfoText = inputId => {
        const infoTexts = {
            playerNumber: `Skriv in det tröjnummer du har på matchtröjan. 
                           Om du inte är en spelare kan du lämna detta tomt.`,
        }
        // Get the info message from the infoText object.
        const infoMsg = infoTexts[inputId];
        // Only show if there is a info message for the focused input, and that it have not been shown yet.
        if (infoMsg && !this.state.infoShown.find(info => info === inputId))
            this.setState({ infoMsg, infoShown: [...this.state.infoShown, inputId] });
        else
            this.setState({ infoMsg: '' });
    }

    closeInfoPopup = () => this.setState({ infoMsg: '' });

    shouldBeShown = inputId => this.state.showInputs.includes(inputId) ? true : false;

    render() {

        const { isRegister, errorMsg, infoMsg } = this.state;

        return (
            <Container brColor={colors.spacegrayish()}>
                <Fade show={infoMsg} />
                <DisplayError errorMsg={errorMsg} />
                <DisplayInfo infoMsg={infoMsg} close={this.closeInfoPopup}></DisplayInfo>
                <CenteredWrapper bigger>
                    <Title>
                        <h2>MVP</h2>
                        <div></div>
                    </Title>
                    <form>
                        <AuthTypes id="changeAuth">
                            <Type active={isRegister} onClick={this.onChangeAuth}>Registrera</Type>
                            <Type active={!isRegister} onClick={this.onChangeAuth}>Logga in</Type>
                        </AuthTypes>
                        <FormInputs shouldBeShown={this.shouldBeShown} displayInfoText={this.displayInfoText} />
                        <Button long onClick={this.onSubmit}>{ isRegister ? 'Registrera' : 'Logga in' }</Button>
                        {/* <p>Fortsätt som gäst</p> */}
                    </form>
                </CenteredWrapper>
            </Container>
        )
    }
}

const Title = styled.div`
    color: #fff;
    font-family: 'Abril Fatface', cursive;
    font-size: 40px;
    margin-bottom: 40px;
    position: relative;
    text-align: center;

    h2 {
        font-size: 40px;
        margin: 0;
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
    }

    div {
        border-bottom: 1px dashed ${colors.orangeish(70)};
        position: absolute;
        top: 50%;
        width: 100%;
        z-index: 1;
    }
`;

const AuthTypes = styled.div`
    margin-bottom: 10px;
    height: 38px;
    position: relative;
    width: 100%;

    div:first-child {
        left: 0;
    }
    div:last-child {
        right: 0;
    }
`;

const Type = styled.div`
    background-color: ${colors.orangeish(120)};
    box-shadow: 1px 1px 18px 0px rgba(0,0,0,0.75);
    color: #fff;
    margin-top: ${props=>props.active?'-6px':'0'};
    opacity: ${props=>props.active?'1':'0.35'};
    padding: 10px 0;
    text-align: center;
    position: absolute;
    transition: 150ms margin ease-out; 
    width: 50%;
`;

export default Login;