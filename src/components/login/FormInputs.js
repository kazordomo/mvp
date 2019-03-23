import React from 'react';
import PropTypes from 'prop-types';
import { MdFace, MdEmail, MdLock, MdPermIdentity } from 'react-icons/md'
import colors from '../../utils/colors';
import Input from '../_basic/Input';

const FormInputs = ({ shouldBeShown }) => {
    return (
        <div>
            <Input 
                type="email" 
                id="email" 
                placeholder="E-post"
                icon={<MdEmail color={colors.orangeish(145)} />}
                show={shouldBeShown("email")} 
                required
            />
            <Input 
                id="firstName" 
                placeholder="Förnamn" 
                icon={<MdFace color={colors.orangeish(120)}  />}
                show={shouldBeShown("firstName")}
                required
            />
            <Input 
                type="number"
                id="playerNumber"
                placeholder="Tröjnummer"
                icon={<MdPermIdentity color={colors.orangeish(95)} />}
                show={shouldBeShown("playerNumber")}
            />
            <Input 
                type="password" 
                id="password"
                placeholder="Lösenord" 
                icon={<MdLock color={colors.orangeish(70)} />} 
                show={shouldBeShown("password")}
                required
            />
            <Input 
                type="password" 
                id="retypePassword" 
                placeholder="Lösenord igen" 
                icon={<MdLock color={colors.orangeish(70)} />}   
                show={shouldBeShown("retypePassword")}
                required
            />
        </div>
    )
}

FormInputs.propTypes = {
    shouldBeShown: PropTypes.func,
}

export default FormInputs;