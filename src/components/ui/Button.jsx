import PropTypes from 'prop-types'
import styled from 'styled-components'

// 스타일
const Button1 = styled.button`
    background-color: ${props => props.$backgroundColor};
    color: ${props => props.$color};
    font-size: ${props => props.$fontSize};
    border: 0;
    border-radius: 8px;
    text-align: center;
    margin: 5px;
`

function Button (props) {
    const backgroundColor = props.backgroundColor || 'black'
    const color = props.color || 'white'
    const fontSize = props.fontSize || 12
    return <Button1 $backgroundColor={backgroundColor} $color={color} $fontSize={fontSize}>{props.name}</Button1>
}

// props 유효성 검사
Button.propTypes = {
    name: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    fontSize: PropTypes.number,
}

export default Button