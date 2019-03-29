import React from 'react';
import PropTypes from 'prop-types';
import { MdFace, MdEmail, MdLock, MdPermIdentity } from 'react-icons/md'
import colors from '../../utils/colors';
import Input from '../_basic/Input';

const FormInputs = ({ shouldBeShown, displayInfoText }) => {
    return (
        <div>
            <Input 
                type="email" 
                id="email" 
                placeholder="E-post"
                displayInfo={displayInfoText}
                icon={<MdEmail color={colors.orangeish(145)} />}
                show={shouldBeShown("email")} 
                required
            />
            <Input 
                id="firstName" 
                placeholder="Förnamn" 
                displayInfo={displayInfoText}
                icon={<MdFace color={colors.orangeish(120)}  />}
                show={shouldBeShown("firstName")}
                required
            />
            <Input 
                type="number"
                id="playerNumber"
                placeholder="Tröjnummer"
                displayInfo={displayInfoText}
                icon={<MdPermIdentity color={colors.orangeish(95)} />}
                show={shouldBeShown("playerNumber")}
            />
            <Input 
                id="password"
                type="password" 
                placeholder="Lösenord" 
                displayInfo={displayInfoText}
                icon={<MdLock color={colors.orangeish(70)} />} 
                show={shouldBeShown("password")}
                required
            />
            <Input 
                type="password" 
                id="retypePassword" 
                placeholder="Lösenord igen" 
                displayInfo={displayInfoText}
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