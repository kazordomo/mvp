import styled from 'styled-components';
import colors from '../../utils/colors';

export default styled.div`
    background: ${colors.yellowish()};
    background: linear-gradient(0deg, ${colors.darkish()} 0%, ${colors.yellowish(.40)} 75%, ${colors.yellowish(.50)} 100%);
    bottom: 0;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
`;