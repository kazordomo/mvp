import styled from 'styled-components';
import colors from '../../assets/colors';

export default styled.div`
    background: ${colors.spacegrayish()};
    background: linear-gradient(0deg, ${colors.yellowish(.65)} 0%, ${colors.spacegrayish(.65)} 75%, ${colors.spacegrayish(.65)} 100%);
    bottom: 0;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
`;