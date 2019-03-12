import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MdGroup, MdEmail } from 'react-icons/md'
import colors from '../../utils/colors';
import Nav from '../_shared/Nav';
import Container from '../_shared/Container';
import CenteredWrapper from '../_shared/CenteredWrapper';
import Input from '../_basic/Input';
import Button from '../_basic/Button';

class Admin extends Component {

    state = {
        opponentsDisabled: true,
        adminDisabled: true,
    }

    onInputChange = input => {
        const inputValue = input.value;
        // Opponents Input
        if (input.getAttribute('id') === 'opponents') {
            if (!inputValue.length !== this.state.opponentsDisabled) {
                this.setState(prevState => { 
                    return { opponentsDisabled: !prevState.opponentsDisabled } 
                });
            }
        }

        // Admin Input
        if (input.getAttribute('id') === 'adminEmail') {
            if (!inputValue.length !== this.state.adminDisabled) {
                this.setState(prevState => { 
                    return { adminDisabled: !prevState.adminDisabled } 
                });
            }
        }
    }

    render() {
        const { ratingOccasion, onOpenRating, onCloseRating, onAddAdminRole } = this.props;

        return (
            <Container brColor={colors.spacegrayish()}>
                <Nav title="ADMIN" />
                <CenteredWrapper bigger>
                    <div>
                        {
                            ratingOccasion ?
                                <div>
                                    <RatingInfo>Aktiv röstning: { ratingOccasion.opponents }</RatingInfo>
                                    <Button 
                                        danger
                                        onClick={onCloseRating}
                                        customStyle={btnStyle} >
                                        <span>Stäng röstning</span>
                                    </Button>
                                </div> :
                                <div>
                                    <Input 
                                        id="opponents" 
                                        placeholder='Motståndare' 
                                        icon={<MdGroup />} 
                                        onChange={e => this.onInputChange(e.target)}
                                        show 
                                    />  
                                    <Button 
                                        success
                                        onClick={() => onOpenRating(document.querySelector('#opponents').value)}
                                        customStyle={btnStyle}
                                        disabled={this.state.opponentsDisabled} >
                                        <span>Öppna röstning</span>
                                    </Button>
                                </div>
                        }
                    </div>
                    <Hr />
                    <div>
                        <Input 
                            id="adminEmail" 
                            placeholder='E-post' 
                            icon={<MdEmail />} 
                            onChange={e => this.onInputChange(e.target)}
                            show 
                        />
                        <Button 
                            onClick={() =>onAddAdminRole(document.querySelector('#adminEmail').value)}
                            customStyle={btnStyle}
                            disabled={this.state.adminDisabled} >
                            <span>Gör till admin</span>
                        </Button>
                    </div>
                </CenteredWrapper>
            </Container>
        )
    }
}

const Hr = styled.div`
    border-bottom: 1px dashed #fff;
    margin: 20px 0px;
    width: 100%;
`;

const RatingInfo = styled.div`
    color: #fff;
    margin-bottom: 20px;
`;

let btnStyle = {
    width: '250px',
}

Admin.propTypes = {
    onAddAdminRole: PropTypes.func,
    ratingOccasion: PropTypes.object,
    onOpenRating: PropTypes.func,
    onCloseRating: PropTypes.func,
}

export default Admin;