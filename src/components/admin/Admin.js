import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../utils/colors';
import Nav from '../_shared/Nav';
import Container from '../_shared/Container';
import CenteredWrapper from '../_shared/CenteredWrapper';
import Input from '../_basic/Input';
import Button from '../_basic/Button';

class Admin extends Component {

    render() {
        const { isRatingOpen, onOpenCloseRating, onAddAdminRole } = this.props

        return (
            <Container brColor={colors.spacegrayish()}>
                <Nav title="ADMIN" />
                <CenteredWrapper>
                    <FormGroup>
                        <Button 
                            success={isRatingOpen?false:true} 
                            danger={isRatingOpen?true:false}
                            onClick={onOpenCloseRating} >
                            <span>{ isRatingOpen ? 'Stäng Röstning' : 'Öppna Röstning' }</span>
                        </Button>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" id="adminEmail" placeholder="someone@example.com" />
                        <Button 
                            onClick={() =>onAddAdminRole(document.querySelector('#adminEmail').value)}>
                            <span>Gör till admin</span>
                        </Button>
                    </FormGroup>
                </CenteredWrapper>
            </Container>
        )
    }
}

const FormGroup = styled.div`
    margin-bottom: 20px;
    
    :last-child {
        mmargin-bottom: 0;
    }
`;

Admin.propTypes = {
    onAddAdminRole: PropTypes.func,
}

export default Admin;