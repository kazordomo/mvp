import React, { useState, useRef } from 'react';
import { Map } from 'immutable';
import styled from 'styled-components';
import { List } from 'immutable';
import { MdTrendingFlat, MdFace, MdEmail, MdLock, MdPermIdentity } from 'react-icons/md'

import colors from '../../assets/colors';

import Container from '../_shared/Container'
import CenteredWrapper from '../_shared/CenteredWrapper';
import Fade from '../_shared/Fade';
import DisplayError from '../_shared/DisplayError';
import DisplayInfo from '../_shared/DisplayInfo';
import Button from '../_basic/Button';
import Input from '../_basic/Input';

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
    margin-top: ${props => props.active ? '-6px' : '0'};
    opacity: ${props => props.active ? '1' : '0.35'};
    padding: 10px 0;
    text-align: center;
    position: absolute;
    transition: 150ms margin ease-out; 
    width: 50%;
`;

const Guest = styled.p`
    align-items: center;
    color: #fff;
    display: flex;
    margin-top: 20px;
    
    span {
        font-size: 15px;
        margin-right: 10px;
    }

    svg {
        font-size: 18px;
    }
`;

const Auth = () => {
	const [isRegister, setIsRegister] = useState(true);
	const [infoMessage, setInfoMessage] = useState('');
	const [shownInfos, setShownInfos] = useState(new List());
	const [errorMessage, setErrorMessage] = useState('');

	const emailRef = useRef(null);
	const nameRef = useRef(null);
	const numberRef = useRef(null);
	const passRef = useRef(null);
	const retypePassRef = useRef(null);

	const refs = [
		emailRef,
		nameRef,
		numberRef,
		passRef,
		retypePassRef
	];

	const INFO_MESSAGES = new Map({
		'playerNumber': 'Skriv in det tröjnummber du har på matchtröjan. Lämna tomt om du inte är en spelare.'
	});

	const handleShowInfo = e => {
		if (shownInfos.includes(e.target.id)) return null;

		setInfoMessage(INFO_MESSAGES.get(e.target.id));
		setShownInfos(e.target.id);
	};
	const handleCloseInfo = () => {
		setInfoMessage('');

		/* make dynamic if reused */
		numberRef.current.focus();
	}

	const login = () => { };
	const register = () => { console.log(refs.map(ref => ref.current.value)) };

	const handleSubmit = e => {
		e.preventDefault();

		isRegister ? register() : login();
	}

	const handleChangeAuthType = () => {
		refs.forEach(ref => ref.current ? ref.current.value = '' : null);
		setIsRegister(prev => !prev);
	}

	const handleGuest = () => console.log('enter as guest');

	return (
		<Container brColor={colors.spacegrayish()}>
			{infoMessage && <Fade />}
			<DisplayError errorMsg={errorMessage} />
			<DisplayInfo infoMsg={infoMessage} close={handleCloseInfo}></DisplayInfo>
			<CenteredWrapper bigger>
				<Title>
					<h2>MVP</h2>
					<div></div>
				</Title>
				<form>
					<AuthTypes id="changeAuth">
						<Type active={isRegister} onClick={handleChangeAuthType}>Registrera</Type>
						<Type active={!isRegister} onClick={handleChangeAuthType}>Logga in</Type>
					</AuthTypes>

					<Input
						type="email"
						id="email"
						ref={emailRef}
						placeholder="E-post"
						icon={<MdEmail color={colors.orangeish(145)} />}
						color={colors.orangeish(145)}
						required
					/>

					{isRegister && (
						<>
							<Input
								type="text"
								id="firstName"
								ref={nameRef}
								placeholder="Förnamn"
								icon={<MdFace color={colors.orangeish(120)} />}
								color={colors.orangeish(120)}
								required
							/>
							<Input
								type="number"
								id="playerNumber"
								ref={numberRef}
								placeholder="Tröjnummer"
								onFocus={handleShowInfo}
								color={colors.orangeish(95)}
								icon={<MdPermIdentity color={colors.orangeish(95)} />}
							/>
						</>
					)}
					<Input
						type="password"
						id="password"
						ref={passRef}
						placeholder="Lösenord"
						icon={<MdLock color={colors.orangeish(70)} />}
						color={colors.orangeish(70)}
						required
					/>

					{isRegister && (
						<Input
							type="password"
							id="retypePassword"
							ref={retypePassRef}
							placeholder="Lösenord igen"
							icon={<MdLock color={colors.orangeish(70)} />}
							color={colors.orangeish(70)}
							required
						/>
					)}

					<Button
						long
						onClick={handleSubmit}>
						{isRegister ? 'Registrera' : 'Logga in'}
					</Button>
				</form>
				<Guest
					onClick={handleGuest}>
					<span>Fortsätt som gäst</span> <MdTrendingFlat />
				</Guest>
			</CenteredWrapper>
		</Container>
	)
}

export default Auth;