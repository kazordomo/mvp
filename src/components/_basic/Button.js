import styled from 'styled-components';
import colors from '../../utils/colors';

/*
    PROPS:
    neutral/success/danger: Bool,
    round: Bool,
    long: Bool,
    customStyle: Object
*/

const defaultStyle = {
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontFamily: '"Josefin Sans", sans-serif',
    height: '65px',
    lineHeight: '65px',
    minWidth: '175px',
    outline: 'none',
    padding: '0 30px',
}

const getBrColor = props => {
    if(props.success)
        return colors.greenish();
    else if(props.danger)
        return colors.redish();
    else
        return colors.orangeish();
}

export default styled('button')({
    ...defaultStyle,
}, props => ({
    backgroundColor: getBrColor(props),
    borderRadius: props.round ? '25px' : '2px',
    width: props.long ? '100%' : 'auto',
    ...props.customStyle
}));