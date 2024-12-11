import React, { useEffect, useRef } from "react";
import { useMediaStore } from "stores/CommonStore"; 

export const YouTubePlayer = ({ videoId }) => {
    const playerRef = useRef(null)
    const {fullScreen, setFullScreen, setReadyToPlay} = useMediaStore()

    // ESC 키 충돌 처리
    useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.key === "Escape") {
            if (document.fullscreenElement) { // full screen일 때 esc키를 누른 경우
              document.exitFullscreen();
              setFullScreen(false)
            } else {
            //   console.log("ESC pressed outside fullscreen");
            }
          }
        };
      
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [])
    
    useEffect(() => {
        // YouTube API 스크립트를 동적으로 추가
        const loadYouTubeAPI = () => {
            if (!window.YT) {
                // YouTube IFrame API를 로드
                const tag = document.createElement("script")
                tag.src = "https://www.youtube.com/iframe_api"

                const firstScriptTag = document.getElementsByTagName("script")[0]
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

                // API 로드 완료 후 실행
                window.onYouTubeIframeAPIReady = initializePlayer
            } else {
                initializePlayer()
            }
        }

        // 플레이어 초기화
        const initializePlayer = () => {
            // YT.Player를 통해 YouTube 플레이어 생성
            playerRef.current = new window.YT.Player("youtube-player", {
            videoId: videoId, // 재생할 동영상 id
            playerVars: { autoplay: 1, controls: 0, mute: 0, modestbranding: 1, rel: 0 }, // 동영상의 동작 설정
            events: { onReady: onPlayerReady, onStateChange: onPlayerStateChange } // 콜백 핸들러 > onReady: 플레이어 준비 완료 시, onStateChange: 플레이어 상태 변경 시 호출
            })
            /** playerVars
            자동재생 autoplay = 0 or 1
            시작, 끝나는 시간 start = 61 / end = 120
            영상 컨트롤러 표시 controls = 0 or 1
            로고 표시 modestbranding = 0 or 1
            반복 재생 loop = 1 & playlist =비디오_ID
            관련 영상 표시 rel = 0 or 1
            * 
            */
        }

        // 전체 화면 변화 감지 핸들러
        const handleFullscreenChange = () => {
            if (document.fullscreenElement) {
                // console.log("Entered fullscreen mode");
            } else {
                // console.log("Exited fullscreen mode");
                setFullScreen(false)
            }
        };
    
        // 이벤트 리스너 추가
        document.addEventListener("fullscreenchange", handleFullscreenChange);
    
        loadYouTubeAPI();
    
        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoId])

    useEffect(() => {
        if (fullScreen) enterFullScreen()
    }, [fullScreen])

    // 플레이어 준비 핸들러
    const onPlayerReady = (event) => {
        setReadyToPlay(true)
    }

    // 플레이어 상태 변경 핸들러
    const onPlayerStateChange = (event) => {
        // console.log("Player state changed:", event.data, window.YT.PlayerState.ENDED)
        // 재생 종료
        if (event.data === window.YT.PlayerState.ENDED) { // 재생 완료
            setReadyToPlay(false)
        }
    }

    // 재생 버튼
    const playVideo = () => {
        if (playerRef.current) playerRef.current.playVideo();
    }
    // 일시 정지 버튼
    const pauseVideo = () => {
        if (playerRef.current) playerRef.current.pauseVideo();
    }

    // 전체 화면으로 전환하는 함수
    const enterFullScreen = () => {
        if (playerRef.current) {
            const iframe = playerRef.current.getIframe(); // IFrame 요소 가져오기
            if (iframe.requestFullscreen) {
                iframe.requestFullscreen();
            }
            // else if (iframe.mozRequestFullScreen) {
            //     iframe.mozRequestFullScreen(); // Firefox 구버전
            // } else if (iframe.webkitRequestFullscreen) {
            //     iframe.webkitRequestFullscreen(); // Chrome, Safari 구버전
            // } else if (iframe.msRequestFullscreen) {
            //     iframe.msRequestFullscreen(); // Edge, IE
            // }
        }
    }

    return (
        <div>
            <div id="youtube-player" style={{ width: "100%", height: "475px" }}></div>
        </div>
    )
}