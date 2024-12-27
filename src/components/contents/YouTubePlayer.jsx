import React, { useEffect, useRef } from "react";
import { useMediaStore } from "stores/mediaStore"; 
import styled from "styled-components";

import YouTube from "react-youtube";

export const YouTubePlayer = ({ videoId, width="100%", height="475px", borderRadius="0" }) => {
    console.log('YouTubePlayer > videokey', videoId);

    const playerRef = useRef(null)
    const {setFullScreen, setReadyToPlay, setEndPlay} = useMediaStore()

    const opts = {
        height: height,
        width: width,
        playerVars: { autoplay: 1, controls: 0, mute: 1, modestbranding: 0, rel: 0 }
    }

    // ESC 키 충돌 처리
    useEffect(() => {
        const handleKeyDown = (event) => {
            console.log('handleKeyDown', event.key);
            if (event.key === "Escape") {
                if (document.fullscreenElement) { // full screen일 때 esc키를 누른 경우
                    document.exitFullscreen();
                    setFullScreen(false)
                    setEndPlay(false)
                }
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            if (playerRef.current) playerRef.current.destroy()
            console.log('destroy', JSON.parse(JSON.stringify(playerRef.current)));
        }
    }, [])

    const onReady = (event) => {
        console.log('🎞🎞 재생 준비', );
        playerRef.current = event.target;
    }
    const onPlay = (event) => {
        console.log('🎞🎞 재생 시작', );
        setReadyToPlay(true)
        setEndPlay(false)
    }
    const onPause = (event) => {
        console.log('🎞🎞 재생 일시 정지', );
    }
    const onEnd = (event) => {
        console.log('재생 완료 🎞🎞', );
        setReadyToPlay(false)
        setEndPlay(true)
    }
    // 재생 에러
    const onError = (event) => {
        console.error("에러 발생 🎞🎞", event.data);
        setReadyToPlay(false)
        setEndPlay(true)
        
        // 에러 상태에 따라 다르게 처리
        // switch (event.data) {
        //     case 2:
        //         console.error("Invalid video ID");
        //     break;
        //     case 5:
        //         console.error("HTML5 player error");
        //     break;
        //     case 100:
        //         console.error("Video not found or private");
        //     break;
        //     case 101:
        //     case 150:
        //         console.error("Embedding restricted");
        //     break;
        //     default:
        // }
    }
    // 플레이어 상태 변경
    const onStateChange = (event) => {
        // 재생 종료
        // if (event.data === 0) { // 재생 완료
        //     console.log('재생 완료 🎞🎞', );
        //     setReadyToPlay(false)
        //     setEndPlay(true)
        // }

        switch (event.data) {
            case -1:
                console.log('Player state changed: UNSTARTED', )
                break
            case 0:
                console.log('Player state changed: ENDED', )
                break
            case 1:
                console.log('Player state changed: PLAYING', )
                break
            case 2:
                console.log('Player state changed: PAUSED', )
                break
            case 3:
                console.log('Player state changed: BUFFERING', )
                break
            case 5:
                console.log('Player state changed: CUED', )
                break
            default:
                console.log('Player state changed: default', );
        }
        /**
         PLAYING: 1
         PAUSED: 2
         BUFFERING: 3
         CUED: 5
         ENDED: 0
         UNSTARTED: -1
        */
    }

    // 재생 정지 관련
    const playVideo = () => { if (playerRef.current) playerRef.current.playVideo() } // 재생
    const pauseVideo = () => { if (playerRef.current) playerRef.current.pauseVideo() } // 일시 정지
    const stopVideo = () => { if (playerRef.current) playerRef.current.stopVideo() } // 재생 멈춤
    const seekTo = (seconds, allowSeekAhead=false) => { if (playerRef.current) playerRef.current.seekTo(seconds, allowSeekAhead) } // 특정 시간(seconds)으로 이동
    // 볼륨 관련
    const mute = () => { if (playerRef.current) playerRef.current.mute() } // 음소거
    const unMute = () => { if (playerRef.current) playerRef.current.unMute() } // 음소거 해제
    const setVolume = () => { if (playerRef.current) playerRef.current.setVolume(50) } // 볼륨 설정
    // 영상 정보 관련
    const getVideoData = () => { if (playerRef.current) playerRef.current.getVideoData() } // 현재 영상의 정보를 반환 => {video_id, title, author}
    // 현재 영상의 재생 시간을 초 단위로 반환
    const getCurrentTime = () => {
        if (playerRef.current) {
          const currentTime = playerRef.current.getCurrentTime() // 현재 재생 시점 (초 단위)
          console.log(`현재 재생 시점: ${currentTime.toFixed(2)}초`)
        }
    }
    const getDuration = () => { if (playerRef.current) playerRef.current.getDuration() } // 영상의 전체 길이를 초 단위로 반환
    const getPlayerState = () => { if (playerRef.current) playerRef.current.getPlayerState() } // 현재 플레이어 상태를 반환
                                  // -1: 로드되지 않음, 0: 종료됨, 1: 재생 중, 2: 일시 정지, 3: 버퍼링 중, 5: 영상 큐 로드됨

    // 전체 화면으로 전환하는 함수
    const enterFullScreen = () => {
        if (playerRef.current) {
            // console.log('enterFullScreen', playerRef.current);
            const iframe = playerRef.current.getIframe() // IFrame 요소 가져오기
            unMute()
            if (iframe.requestFullscreen) {
                iframe.requestFullscreen()
            } else if (iframe.mozRequestFullScreen) {
                iframe.mozRequestFullScreen() // Firefox 구버전
            } else if (iframe.webkitRequestFullscreen) {
                iframe.webkitRequestFullscreen() // Chrome, Safari 구버전
            } else if (iframe.msRequestFullscreen) {
                iframe.msRequestFullscreen() // Edge, IE
            }
        }
    }
    
    return (
        <div id="player">
            <YouTube
                videoId={videoId}
                id={'ytb-' + videoId}
                className="youtube-player"
                opts={opts}
                onReady={onReady}
                onPlay={onPlay}
                onPause={onPause}
                onEnd={onEnd}
                onError={onError}
                onStateChange={onStateChange}
            />
            {videoId && <>
                    <div id="video-fullscreen-btn" onClick={enterFullScreen} style={{opacity: 0}}></div>
                    <div id="video-play-btn" onClick={playVideo} style={{opacity: 0}}></div>
                    <div id="video-stop-btn" onClick={stopVideo} style={{opacity: 0}}></div>
                    <div id="video-mute-btn" onClick={mute} style={{opacity: 0}}></div>
                    <div id="video-unmute-btn" onClick={unMute} style={{opacity: 0}}></div>
                    <div id="video-currenttime-btn" onClick={getCurrentTime} style={{opacity: 0}}></div>
            </>}
        </div>
    )
}

const Player = styled.div`
    width: ${props => props.$width};
    height: ${props => props.$height};
    border-radius: ${props => props.$borderRadius}; // 8px 8px 0 0;

    & > #youtube-player {
        width: ${props => props.$width};
        height: ${props => props.$height};
    }
`

/* <YouTube
    videoId={string}                  // defaults -> ''
    id={string}                       // defaults -> ''
    className={string}                // defaults -> ''
    iframeClassName={string}          // defaults -> ''
    style={object}                    // defaults -> {}
    title={string}                    // defaults -> ''
    loading={string}                  // defaults -> undefined
    opts={obj}                        // defaults -> {}
    onReady={func}                    // defaults -> noop
    onPlay={func}                     // defaults -> noop
    onPause={func}                    // defaults -> noop
    onEnd={func}                      // defaults -> noop
    onError={func}                    // defaults -> noop
    onStateChange={func}              // defaults -> noop
    onPlaybackRateChange={func}       // defaults -> noop
    onPlaybackQualityChange={func}    // defaults -> noop
/> */