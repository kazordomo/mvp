import styled from 'styled-components';

export default styled.div`
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: ${props=>props.bigger?'250':'200'}px;
`;