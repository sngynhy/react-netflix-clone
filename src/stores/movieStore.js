import { create } from "zustand";
import { devtools } from 'zustand/middleware';

// create 함수로 sotre 생성
// create 함수의 콜백은 set, get을 인자로 가지며, 이를 통해 상태를 조회하거나 업데이트
// 만일, set 함수 호출 시 콜백을 사용하면 get 함수를 사용하지 않아도 바로 state를 얻을 수 있음
// create 함수의 콜백이 반환하는 객체에서의 속성은 상태(state)이고, 함수는 액션(Action)이라고 부름
// create 함수 호출에서 반환하는 Store Hook은, use 접두사와 Store 접미사로 명명하여 사용 ex) useMovieStore
export const useMovieStore = create(
    devtools(set => ({
        mediaType: '',
        setMediaType: (type) => set({mediaType: type}),
        
        likes: [],
        setLikes: (id) => set((state) => ({
            likes: [...state.likes, id]
        })),
        clearLikes: () => set({ likes: [] }),

        genres: [],
        setGenres: (genre) => set((state) => ({
            genres: genre // 기존 상태에 새 장르 추가
          })),
        clearGenres: () => set({genres: []})
    }))
)