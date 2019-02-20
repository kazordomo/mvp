import styled, { keyframes } from 'styled-components';
import * as reactAnimation from 'react-animations';

const getAnimation = type => keyframes`${reactAnimation[type]}`

export default styled.div`
    animation: ${props => props.sec ? props.sec : '1'}s ${props => getAnimation(props.type)};
`;