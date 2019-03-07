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
    minWidth: '200px',
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
    boxShadow: props.shadow ? '-3px 1px 18px 0px rgba(0,0,0,0.75)' : 'none',
    width: props.long ? '100%' : 'auto',
    ...props.customStyle
}));