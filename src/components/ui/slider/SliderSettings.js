import { PrevArrow, NextArrow } from './SliderButton'

export const settings = {
    slide: 'div',
    dots: false, // 하단 네비게이션 점 표시
    infinite: true, // 무한 반복
    speed: 1000, // 슬라이드 전환 속도 (ms)
    slidesToShow: 6, // 한 번에 보여줄 슬라이드 수
    slidesToScroll: 6, // 한 번에 스크롤할 슬라이드 수
    draggable: false,
    arrows : true, // 옆으로 이동하는 화살표 표시 여부
    prevArrow : <PrevArrow />, // 이전 화살표 모양 설정
    nextArrow : <NextArrow />, // 다음 화살표 모양 설정
    responsive: [ // 반응형 웹 구현 옵션
        {  
            breakpoint: 768, //화면 사이즈 768px일 때
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                draggable: true,
                arrows: false
            } 
        },
        {  
            breakpoint: 1024, //화면 사이즈 1024px일 때
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                draggable: true,
                arrows: false
            } 
        },
    ]
}