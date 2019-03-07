import styled from 'styled-components';

export default styled.div `
    background-color: rgba(0,0,0,0.75);
    bottom: 0;
    display: ${props=>props.show ? 'block' : 'none'};
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 2;
`;