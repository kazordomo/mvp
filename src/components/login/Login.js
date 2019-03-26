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
import DisplayError from '../_shared/DisplayError';
import FormInputs from './FormInputs';

class Login extends Component {

    state = {
        isRegister: true,
        showInputs: registerInputs,
        errorMsg: '',
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
            }
        });
    }

    // Will not be used in prod.
    signOut = async e => {
        e.preventDefault();
        await firebase.auth().signOut();
        console.log('The user has signed out');
    }

    shouldBeShown = inputId => this.state.showInputs.includes(inputId) ? true : false;

    render() {

        const { isRegister } = this.state;

        return (
            <Container brColor={colors.spacegrayish()}>
                <DisplayError errorMsg={this.state.errorMsg} />
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
                        <FormInputs shouldBeShown={this.shouldBeShown} />
                        <Button long onClick={this.onSubmit}>{ isRegister ? 'Registrera' : 'Logga in' }</Button>
                        {/* <Guest>
                            <p>Fortsätt som gäst</p> 
                            <MdKeyboardArrowRight />
                        </Guest> */}
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

const Guest = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    color: #fff;

    p {
        font-size: 18px;
        margin-right: 5px;
    }
    svg {
        font-size: 25px;
    }
`;

export default Login;