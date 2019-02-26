import React from 'react';
import PropTypes from 'prop-types';
import colors from '../../utils/colors'
import Nav from '../_shared/Nav';
import Container from '../_shared/Container';
import Wrapper from '../_shared/Wrapper';

// import PropTypes from 'prop-types';

/* TODO:
Who voted for who at what game? Display some statistics about the voting
done in the past.

Show statistics of who has the most 3 points etc.
*/

const Statistics = () => {
    return (
        <Container brColor={colors.spacegrayish()}>
            <Nav title="STATISTIK" />
            <Wrapper></Wrapper>
        </Container>
    )
}

Statistics.propTypes = {

}

export default Statistics;