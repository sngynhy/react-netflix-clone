import React from "react";
import { FaPlay } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import styled from "styled-components";
import { useMediaStore } from "stores/mediaStore"; 
import { media } from "utils/mediaQuery";

export const PlayButton = ({active=false, type="button", iconSize=35}) => { // type: 'button' or 'icon'
    const {playerState, playable} = useMediaStore()
    const videoPlay = () => {
        if (active && playable) {
            document.getElementById('video-fullscreen-btn-' + playerState.id).click()
            document.getElementById('video-currenttime-btn-' + playerState.id).click()
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
    ${media.large`
        padding: 0.6rem 1.6rem;
        font-size: 20px;
    `}
    ${media.medium`
        padding: 0.6rem 1.6rem;
        font-size: 20px;
    `}
    ${media.small`
        padding: 0.3rem 0.8rem;
        font-size: 0.8rem;
    `}
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