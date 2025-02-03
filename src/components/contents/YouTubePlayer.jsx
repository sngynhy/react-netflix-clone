import React, { useEffect, useRef } from "react";
import { useMediaStore } from "stores/mediaStore"; 
import styled from "styled-components";
import YouTube from "react-youtube";

export const YouTubePlayer = React.memo(({ videoId, startTime=0, width="100%", height="475px", borderRadius="0" }) => {
    // console.log('🎬🎥📺 YouTubePlayer', videoId);
    const playerRef = useRef(null)
    const {isMuted, setFullScreen, setPlayerState, setVideoCurrentTime} = useMediaStore()
    const opts = {
        height: height,
        width: width,
        playerVars: {
            autoplay: 1,
            controls: 0,
            mute: 1,
            modestbranding: 0,
            rel: 0,
            enablejsapi: 1, // JavaScript API 사용 권한 활성화
            origin: window.location.origin, // 현재 사이트 도메인을 origin으로 설정
        }
    }
    /** playerVars
        자동재생 autoplay = 0 or 1
        시작, 끝나는 시간 start = 61 / end = 120
        영상 컨트롤러 표시 controls = 0 or 1
        로고 표시 modestbranding = 0 or 1
        반복 재생 loop = 1 & playlist =비디오_ID
        관련 영상 표시 rel = 0 or 1
    * 
    */

    // 전체화면 상태 감지
    const handleFullscreenChange = () => setFullScreen(!!document.fullscreenElement);
    // const handleKeyDown = (event) => {
    //     if (document.fullscreenElement) {
    //         switch (event.key) {
    //             case "ArrowLeft":
    //                 playerRef.current?.seekTo(playerRef.current?.getCurrentTime() - 10);
    //                 break;
    //             case "ArrowRight":
    //                 playerRef.current?.seekTo(playerRef.current?.getCurrentTime() + 10);
    //                 break;
    //             default:
    //                 console.log('handleKeyDown', event.key);
    //                 break;
    //         }
    //     }
    // }

    useEffect(() => {
        // 전체화면 변경 이벤트
        document.addEventListener("fullscreenchange", handleFullscreenChange)
        // 키 이벤트
        // document.addEventListener("keydown", handleKeyDown)
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange)
            // document.removeEventListener("keydown", handleKeyDown)
            if (playerRef.current) {
                playerRef.current.destroy()
                setPlayerState({id: videoId, state: -999, error: null})
                console.log('destroy', videoId, JSON.parse(JSON.stringify(playerRef.current)));
            }
        }
    }, [setPlayerState, videoId])

    const onReady = (event) => {
        // console.log('🎞🎞 재생 준비', );
        playerRef.current = event.target;
        if (startTime !== 0) {
            // console.log('startTime', startTime);
            seekTo(startTime, true)
        }
        setPlayerState({id: videoId, state: -1, desc: 'READY', error: null})
    }
    const onPlay = (event) => {
        // console.log('🎞🎞 재생 시작', event);
        isMuted ? mute() : unMute()
        setVideoCurrentTime(0)
        setPlayerState({id: videoId, state: event.data, desc: 'PLAYING', error: null})
    }
    const onPause = (event) => {
        // console.log('🎞🎞 재생 일시 정지', );
        setPlayerState({id: videoId, state: event.data, desc: 'PAUSED', error: null})
    }
    const onEnd = (event) => {
        // console.log('재생 완료 🎞🎞', );
        setVideoCurrentTime(0)
        setPlayerState({id: videoId, state: event.data, desc: 'ENDED', error: null})
        if (document.fullscreenElement) document.exitFullscreen();
    }
    // 재생 에러
    const onError = (event) => {
        // console.error("에러 발생 🎞🎞", event.data);
        // 에러 상태에 따라 다르게 처리
        switch (event.data) {
            case 2:
                // console.error("Invalid video ID > 요청한 콘텐츠를 찾을 수 없음");
                setPlayerState({id: videoId, state: -999, error: {state: event.data, message: 'Invalid video ID'}})
                break
            case 5:
                // console.error("HTML5 player error > HTML5 플레이어에서 지원되지 않는 콘텐츠");
                setPlayerState({id: videoId, state: -999, error: {state: event.data, message: 'HTML5 player error'}})
                break
            case 100:
                // console.error("Video not found or private > 요청한 비디오가 비공개 또는 삭제됨");
                setPlayerState({id: videoId, state: -999, error: {state: event.data, message: 'Video not found or private'}})
                break
            case 101:
            case 150:
                // console.error("Embedding restricted > 요청한 비디오가 특정 도메인에서 재생할 수 없음");
                setPlayerState({id: videoId, state: -999, error: {state: event.data, message: 'Embedding restricted'}})
                break
            default:
                setPlayerState({id: videoId, state: -999, error: {state: event.data, message: 'PLAYER ERROR'}})
        }
    }
    // 플레이어 상태 변경
    const onStateChange = (event) => {
        /**
         PLAYING: 1
         PAUSED: 2
         BUFFERING: 3
         CUED: 5
         ENDED: 0
         UNSTARTED: -1
        */
        switch (event.data) {
            case -1: // 시작되기 전
                // console.log('Player state changed: UNSTARTED', )
                // setPlayerState({id: videoId, state: event.data, desc: 'UNSTARTED', error: null})
                break
            case 0: // 종료
                // console.log('Player state changed: ENDED', )
                // setPlayerState({id: videoId, state: event.data, desc: 'ENDED', error: null})
                break
            case 1: // 재생 중
                // console.log('Player state changed: PLAYING', )
                // setPlayerState({id: videoId, state: event.data, desc: 'PLAYING', error: null})
                break
            case 2: // 일지 정지
                // console.log('Player state changed: PAUSED', )
                // setPlayerState({id: videoId, state: event.data, desc: 'PAUSED', error: null})
                break
            case 3: // 버퍼링
                // console.log('Player state changed: BUFFERING', )
                // setPlayerState({id: videoId, state: event.data, desc: 'BUFFERING', error: null})
                break
            case 5: // 동영상 신호 > 영상이 준비되었으나 아직 재생되지 않은 상태
                // console.log('Player state changed: CUED', )
                // setPlayerState({id: videoId, state: event.data, desc: 'CUED', error: null})
                break
            default:
                // console.log('Player state changed: default', )
                // setPlayerState({id: videoId, state: event.data, desc: '', error: null})
        }
    }

    // 재생 관련
    const playVideo = () => {
        if (playerRef.current) {
            // console.log('🎪 playVideo', );
            playerRef.current.playVideo()
        }
    } // 재생
    const pauseVideo = () => { // 일시 정지
        if (playerRef.current) {
            // console.log('🎪 pauseVideo', );
            playerRef.current.pauseVideo()
            getCurrentTime()
            // stopVideo()
        }
    }
    const stopVideo = () => { // 재생 멈춤
        if (playerRef.current) {
            // console.log('🎪 stopVideo', );
            playerRef.current.stopVideo()
            setPlayerState({id: videoId, state: 0, desc: 'ENDED', error: null})
        }
    }
    const seekTo = (seconds, allowSeekAhead=false) => { // 특정 시간(seconds)으로 이동
        if (playerRef.current) playerRef.current.seekTo(seconds, allowSeekAhead)
    }
    // 볼륨 관련
    const mute = () => { // 음소거
        if (playerRef.current) {
            // // console.log('🔈 unMute', );
            playerRef.current.mute()
        }
    }
    const unMute = () => { // 음소거 해제
        try {
            if (playerRef.current) {
                // // console.log('🔊 unMute', );
                playerRef.current.unMute()
            }
        } catch (error) {
            // console.error('Unmuting failed:', error);
        }
    }
    const setVolume = () => { if (playerRef.current) playerRef.current.setVolume(50) } // 볼륨 설정
    // 영상 정보 관련
    const getVideoData = () => { if (playerRef.current) playerRef.current.getVideoData() } // 현재 영상의 정보를 반환 => {video_id, title, author}
    // 현재 영상의 재생 시간을 초 단위로 반환
    const getCurrentTime = () => {
        if (playerRef.current) {
          const currentTime = playerRef.current.getCurrentTime() // 현재 재생 시점 (초 단위)
        //   // console.log(`현재 재생 시점: ${currentTime}초`)
          setVideoCurrentTime(currentTime)
        }
    }
    const getDuration = () => { if (playerRef.current) playerRef.current.getDuration() } // 영상의 전체 길이를 초 단위로 반환
    const getPlayerState = () => { if (playerRef.current) playerRef.current.getPlayerState() } // 현재 플레이어 상태를 반환
                                  // -1: 로드되지 않음, 0: 종료됨, 1: 재생 중, 2: 일시 정지, 3: 버퍼링 중, 5: 영상 큐 로드됨
    // 전체 화면으로 전환하는 함수
    const enterFullScreen = () => {
        if (playerRef.current) {
            const iframe = playerRef.current.getIframe() // IFrame 요소 가져오기
            if (iframe.requestFullscreen) {
                iframe.requestFullscreen()
            } else if (iframe.mozRequestFullScreen) {
                iframe.mozRequestFullScreen() // Firefox 구버전
            } else if (iframe.webkitRequestFullscreen) {
                iframe.webkitRequestFullscreen() // Chrome, Safari 구버전
            } else if (iframe.msRequestFullscreen) {
                iframe.msRequestFullscreen() // Edge, IE
            }
            playVideo()
        }
    }
    
    return (
        <Player id="player" $width={width} $height={height} $borderRadius={borderRadius}>
            {videoId && <>
                <YouTube
                    videoId={videoId}
                    className="youtube-player"
                    id={'ytb-' + videoId}
                    opts={opts}
                    onReady={onReady}
                    onPlay={onPlay}
                    onPause={onPause}
                    onEnd={onEnd}
                    onError={onError}
                    onStateChange={onStateChange}
                />
                <div className='btns'>
                    <div id={"video-fullscreen-btn-" + videoId} onClick={enterFullScreen} style={{opacity: 0}}></div>
                    <div id={"video-play-btn-" + videoId} onClick={playVideo} style={{opacity: 0}}></div>
                    <div id={"video-stop-btn-" + videoId} onClick={stopVideo} style={{opacity: 0}}></div>
                    <div id={"video-puause-btn-" + videoId} onClick={pauseVideo} style={{opacity: 0}}></div>
                    <div id={"video-currenttime-btn-" + videoId} onClick={getCurrentTime} style={{opacity: 0}}></div>
                    <div id={"video-mute-btn"} onClick={mute} style={{opacity: 0}}></div>
                    <div id={"video-unmute-btn"} onClick={unMute} style={{opacity: 0}}></div>
                </div>
            </>}
        </Player>
    )
})

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