import { create } from "zustand";
import { devtools } from 'zustand/middleware';

// create 함수로 sotre 생성
// create 함수의 콜백은 set, get을 인자로 가지며, 이를 통해 상태를 조회하거나 업데이트
// 만일, set 함수 호출 시 콜백을 사용하면 get 함수를 사용하지 않아도 바로 state를 얻을 수 있음
// create 함수의 콜백이 반환하는 객체에서의 속성은 상태(state)이고, 함수는 액션(Action)이라고 부름
// create 함수 호출에서 반환하는 Store Hook은, use 접두사와 Store 접미사로 명명하여 사용 ex) useMovieStore
export const useGlobalStore = create(
    devtools(set => ({
        isLoading: false,
        setIsLoading: (state) => set({isLoading: !state.isLoading})
    }))
)

export const useMediaStore = create(
    devtools((set, get) => ({
        likes: [],
        addLikes: (id) => set((state) => ({ likes: [...state.likes, id] })),
        removeLikes: (id) => set((state) => ({ likes: state.likes.filter(el => el !== id) })),
        clearLikes: () => set({ likes: [] }),

        videoId: '',
        setVideoId: (value) => set({videoId: value}),
        readyToPlay: false, // 동영상 재생 준비 완료
        setReadyToPlay: (value) => set({ readyToPlay: value }),
        endPlay: false, // 동영상 재생 완료
        setEndPlay: (value) => set({endPlay: value}),
        fullScreen: false, // 전체 화면
        setFullScreen: (value) => set({fullScreen: value}),

        genreName: '',
        setGenreName: (val) => set({ genreName: val}),

        openDetailModal: false,
        setOpenDetailModal: (openDetailModal) => set({openDetailModal: openDetailModal, readyToPlay: false}),
    }))
)