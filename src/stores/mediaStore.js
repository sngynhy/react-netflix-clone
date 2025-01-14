import { create } from "zustand";
import { devtools } from 'zustand/middleware';

// create 함수로 sotre 생성
// create 함수의 콜백은 set, get을 인자로 가지며, 이를 통해 상태를 조회하거나 업데이트
// 만일, set 함수 호출 시 콜백을 사용하면 get 함수를 사용하지 않아도 바로 state를 얻을 수 있음
// create 함수의 콜백이 반환하는 객체에서의 속성은 상태(state)이고, 함수는 액션(Action)이라고 부름
// create 함수 호출에서 반환하는 Store Hook은, use 접두사와 Store 접미사로 명명하여 사용
export const useMediaStore = create(
    devtools((set, get) => ({    
        mediaTypes: { movie: '영화', tv: '시리즈' },
        
        genreName: '',
        setGenreName: (value) => set({ genreName: value}),
        
        openModal: false,
        setOpenModal: (value) => set({openModal: value}),
                
        videoId: null,
        setVideoId: (value) => set({videoId: value}),
        playable: false, // 영상 재생 가능
        setPlayable: (value) => set({playable: value}),
        // 재생 상태
        playerState: {state: -999, error: null},
        setPlayerState: (value) => {
            console.log('📂 playerState', value);
            set({
                playerState: value,
                playable: [1,2,5,0].includes(value.state)
            })
            /**
                PLAYING: 1
                PAUSED: 2
                BUFFERING: 3
                CUED: 5
                ENDED: 0
                UNSTARTED: -1
            */
        },
        videoCurrentTime: 0, // 재생 영상 현재 시각
        setVideoCurrentTime: (value) => set({videoCurrentTime: value}),
        fullScreen: false, // 전체 화면
        setFullScreen: (value) => set({fullScreen: value}),
        isMuted: true, // 음소거
        setIsMuted: (value) => set({isMuted: value}),

        // 찜 기능
        likes: new Map(),
        addLikes: (id, type) => set(state => {
            const updatedMap = new Map(state.likes)
            updatedMap.set(id, type)
            return { likes: updatedMap }
        }),
        removeLikes: (id) => set(state => {
            const updatedMap = new Map(state.likes)
            updatedMap.delete(id)
            return { likes: updatedMap }
        }),
    }))
)