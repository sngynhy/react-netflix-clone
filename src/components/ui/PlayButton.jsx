import React from "react";
import { FaPlay } from "react-icons/fa";
import styled from "styled-components";
import { useMediaStore } from "stores/CommonStore"; 

function PlayButton ({ active }) {
    const {setFullScreen} = useMediaStore()
    const videoPlay = () => {
        if (active) setFullScreen(true)
        else alert('동영상 재생이 불가능합니다.')
    }
    return (
        <Button active={active} onClick={videoPlay}><FaPlay />재생</Button>
    )
}

const Button = styled.button`
    margin-right: 10px;
    padding: 0.6rem 1.6rem;
    font-size: 20px;
    border-radius: 4px;
    border: none;
    background-color: ${props => props.active ? '#ffffff;' : '#ffffffbf;'}
    ${props => props.active && 'cursor: pointer;'}
    & > svg {
        margin-right: 8px;
    }
    ${props => props.active &&
    `&:hover {
        background-color: #ffffffbf;
    }`}
`

export default PlayButton