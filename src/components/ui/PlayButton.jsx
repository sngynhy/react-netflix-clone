import React from "react";
import { FaPlay } from "react-icons/fa";
import { GoPlay } from "react-icons/go";
import styled from "styled-components";
import { useMediaStore } from "stores/mediaStore"; 

export const PlayButton = ({ active=false, type="button", height='40px', width='40px' }) => { // type: 'button' or 'icon'
    const {setFullScreen} = useMediaStore()
    const videoPlay = () => {
        if (active) setFullScreen(true)
        else alert('재생할 수 없는 콘텐츠입니다.')
    }
    return (
        <div style={{display: 'inline-block'}} onClick={videoPlay}>
            {type === 'button'
            ? <Button active={active}><FaPlay />재생</Button>
            : <span><GoPlay style={{width: width, height: height, cursor: 'pointer'}}/></span>}
        </div>
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