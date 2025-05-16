import { keepPreviousData } from "@tanstack/react-query"

// 메인 콘텐츠 동영상 height
export const videoHeight = {
    sm: 232,
    md: 567,
    lg: 900
}

// 그리드 컬럼 수
export const gridColumns = {
    sm: 2,
    md: 4,
    lg: 6
}

// 로고 이미지 사이즈
export const logoImage = {
    main: {
        lg: {width: '7rem', height: '3rem'},
        md: {width: '6rem', height: '2.5rem'},
        sm: {width: '5.5rem', height: '2rem'}
    },
    modal: {
        lg: {width: '15rem', height: '8rem'},
        md: {width: '14rem', height: '6rem'},
        sm: {width: '5.5rem', height: '2rem'}
    }
}

export const modalMediaSize = {
    logoImg: {
        lg: {width: '15rem', height: '8rem'},
        md: {width: '14rem', height: '6rem'},
        sm: {width: '5.5rem', height: '2rem'}
    },
    videoHeight: {
        sm: 238,
        md: 499,
        lg: 476
    },
    gridColumns: {
        lg: 3,
        md: 2,
        sm: 2
    }
}

// 아이콘 버튼 사이즈
export const buttonSize = {
    lg: {border: 45, icon: 25},
    md: {border: 40, icon: 20},
    sm: {border: 24, icon: 12},
}