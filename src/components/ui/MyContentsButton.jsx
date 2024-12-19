import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { GoPlusCircle } from "react-icons/go";
import { GoCheckCircle } from "react-icons/go";
import { useMediaStore } from 'stores/mediaStore'

const Button = styled.span`
    & > svg {
        width: ${props => props.width};
        height: ${props => props.height};
        cursor: pointer;
        color: hsla(0,0%,100%,.5);
    }
    & > svg:hover {
        color: white;
    }
`
function MyContentsButton ({id, mType, width='30px', height='30px' }) {
    const {likes, addLikes, removeLikes} = useMediaStore()
    const isLiked = likes.has(id) // 찜 상태 확인
    const handleClick = () => {
        isLiked ? removeLikes(id) : addLikes(id, mType)
    }
    return (<Button width={width} height={height} onClick={handleClick}>{isLiked ? <GoCheckCircle style={{fill: 'white'}} /> : <GoPlusCircle />}</Button>)
}

// props 유효성 검사
MyContentsButton.propTypes = {
    id: PropTypes.number.isRequired
}

export default MyContentsButton