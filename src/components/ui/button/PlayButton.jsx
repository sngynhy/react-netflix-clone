import React from "react";
import { FaPlay } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import styled from "styled-components";
import { useMediaStore } from "stores/mediaStore"; 

export const PlayButton = ({ active=false, type="button", iconSize=35 }) => { // type: 'button' or 'icon'
    const {playable, setFullScreen} = useMediaStore()
    const videoPlay = () => {
        if (active && playable) {
            // setFullScreen(true)
            document.getElementById('video-fullscreen-btn').click()
            document.getElementById('video-currenttime-btn').click()
        }
        // else alert('재생할 수 없는 콘텐츠입니다.')
    }
    return (
        <div onClick={videoPlay}>
            {type === 'button'
            ? <Button $active={active}><FaPlay />재생</Button>
            : <Icon $active={active} $width={iconSize} $height={iconSize}><FaCirclePlay /></Icon>}
        </div>
    )
}

const Button = styled.button`
    padding: 0.6rem 1.6rem;
    font-size: 20px;
    border-radius: 4px;
    border: none;
    background-color: ${props => props.$active ? '#ffffff;' : '#ffffffbf;'}
    ${props => props.$active && 'cursor: pointer;'}
    & > svg {
        margin-right: 8px;
    }
    ${props => props.$active &&
        `&:hover {
            background-color: #ffffffbf;
        }`
    }
`
const Icon = styled.span`
    & > svg {
        width: ${props => props.$width}px;
        height: ${props => props.$height}px;
        ${props => props.$active && 'cursor: pointer;'}
        ${props => !props.$active && 'color: hsla(0,0%,100%,.5);'}
        ${props => props.$active &&
            `&:hover {
                color: #ffffffbf;
            }`
        }
    }
`