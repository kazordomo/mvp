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
    height: '50px',
    lineHeight: '50px',
    minWidth: '150px',
    outline: 'none',
    padding: '0 20px',
}

const getBrColor = props => {
    if(props.success)
        return colors.greenish();
    else if(props.danger)
        return colors.redish();
    else
        return colors.darkish();
}

export default styled('button')({
    ...defaultStyle,
}, props => ({
    backgroundColor: getBrColor(props),
    borderRadius: props.round ? '25px' : '2px',
    width: props.long ? '100%' : 'auto',
    ...props.customStyle
}));