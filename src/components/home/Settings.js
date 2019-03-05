import React from 'react';
import styled from 'styled-components';
import colors from '../../utils/colors';
import { signOut } from '../../utils/fetch';
import { MdRemoveCircle } from 'react-icons/md'

const Settings = ({ show, onClose }) => {
    return (
        <SettingsWrapper show={show}>
            <MdRemoveCircle onClick={onClose} color={colors.redish()} />
        </SettingsWrapper>
    );
}

const SettingsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 150px;
    position: absolute;
    right: ${props=>props.show ? '20' : '-40'}px;
    top: 65px;
    transition: right 150ms ease-out;

    svg {
        color: ${colors.dirtpinkish()};
        cursor: pointer;
        font-size: 36px;
    }
`;


export default Settings;
