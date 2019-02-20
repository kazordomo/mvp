import React, { Component } from 'react';
import CenteredWrapper from '../_shared/CenteredWrapper';
import brImage from '../../images/broddshow.jpeg';
import ImageBr from '../_shared/ImageBr';
import GradientBr from '../_shared/GradientBr';
import Animation from '../_shared/Animation';
import Button from '../_basic/Button';
import Input from '../_basic/Input';

class Login extends Component {

    onRegister = () => {
        console.log(document.querySelector('#email').value);
    }

    render() {
        return (
            <div>
                <ImageBr url={brImage} />
                <GradientBr />
                <CenteredWrapper>
                    <Animation type="fadeIn">
                        <Input type="email" id="email" placeholder="someone@example.com" />
                        <Button long onClick={this.onRegister}>Register</Button>
                    </Animation>
                </CenteredWrapper>
            </div>
        )
    }
}

export default Login;