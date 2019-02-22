import styled from 'styled-components';

export default styled.div`
    background-color: ${props => props.brColor};
    min-height: calc(100vh - 40px);
    padding: 20px;
`;