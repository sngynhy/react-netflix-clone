import React, { useEffect, useState } from "react";
import { useVideoQuery } from "hooks/useReactQuery";
import { YouTubePlayer } from "./YouTubePlayer";
import { useMediaStore } from "stores/mediaStore";
import { FaPlay } from "react-icons/fa";
import styled from "styled-components";

export const VideoPlayer = ({id, mType, showPlayButton, show}) => {
    const {playerState, fullScreen} = useMediaStore()
    const [play, setPlay] = useState(false)

    const {data: videokey, isLoading: videoLoading, error: videoError} = useVideoQuery({type: mType, id: id, enabled: !!showPlayButton})

    const onPlay = () => {
        if (videokey && showPlayButton) {
            if (playerState.state === 1 && playerState.id !== videokey) document.getElementById('video-stop-btn-' + playerState.id).click()
            setPlay(true)
        }
    }
    useEffect(() => {
        if (play && playerState.state === 1) {
            document.getElementById('video-fullscreen-btn-' + videokey)?.click()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [play, playerState])

    useEffect(() => {
        if (!fullScreen) setPlay(false)
    }, [fullScreen])

    return (
        <>
            {showPlayButton && show &&
                <div style={{position: 'absolute', top: 'calc(50% - 30px)', left: 'calc(50% - 30px)', zIndex: 999}}>
                    <Border onClick={onPlay} $active={videokey}>
                        <FaPlay />
                    </Border>
                </div>
            }
            {showPlayButton && videokey && play &&
                <div style={{opacity: 0, height: '0px'}}><YouTubePlayer videoId={videokey} width='100%' height='150px' /></div>
            }
        </>
    )
}

const Border = styled.div`
    position: relative;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    border: 1px solid ${props => props.$active ? 'white' : 'rgba(255, 255, 255, 0.7)'};;
    background-color: ${props => props.$active ? 'rgba(30,30,20,.5)' : ''};
    cursor: ${props => props.$active ? 'pointer' : 'default'};

    & > svg {
        width: 28px;
        height: 26px;
        position: absolute;
        top: 10px;
        left: 12px;
        color: ${props => props.$active ? 'white' : 'rgba(255, 255, 255, 0.7)'};
    }
`