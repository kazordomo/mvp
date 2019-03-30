import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = props => {

    return (
        <InputWrapper show={props.show}>
            <Icon>
                { props.icon }
            </Icon>
            <InputField 
                type={ props.type ? props.type : 'text' }
                id={props.id ? props.id : ''}
                placeholder={props.placeholder}
                onChange={props.onChange ? props.onChange : () => false}
                onFocus={props.displayInfo ? () => props.displayInfo(props.id) : () => false}
            />
        </InputWrapper>
    );
}

Input.propTypes = {
    show: PropTypes.bool,
    icon: PropTypes.element,
    type: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
}

export default Input;

const InputWrapper = styled.div`
    background-color: rgba(0,0,0,0.2);
    border-radius: 2px;
    align-items: center;
    color: #fff;
    display: ${props=>props.show?'flex':'none'};
    flex-direction: row;
    margin-bottom: 10px;
    position: relative;
`;

const InputField = styled.input`
    background-color: transparent;
    border: none;
    color: #fff;
    outline: none;
    padding 20px 15px;
    width: 90%;
`;

const Icon = styled.div`
    padding: 0 15px;
    width: 10%;

    svg {
        font-size: 35px;
    }
`;