import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Info, PreviewModal } from "components/ui/modal/PreviewModal";
import { ImageCard } from "../layout/ImageCard";
import styled from "styled-components";
import { settings } from './SliderSettings'
import { useLocation, useNavigate } from "react-router-dom";
import { media } from "utils/mediaQuery";

export const SliderContainer = React.memo(({mType, headerTitle, data}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isHovered, setIsHovered] = useState(false)

    // const [isInside, setIsInside] = useState(false)
    // const [coordinate, setCoordinate] = useState({})
    // const [previewData, setPreviewData] = useState(null)
    // const previewRef = useRef(null)
    
    // useEffect(() => {
    //     let timer
    //     if (isInside) {
    //         timer = setTimeout(() => { if (timer) setIsHovered(true) }, 1000)
    //         /**
    //          * ✅ setTimeout 안에서 사용하는 변수는 타이머가 설정된 시점의 상태 값을 캡처함!
    //          *      방법 1) 최신 상태 값을 참조 위해서는 Ref 활용!
    //          *      방법 2) 동작의 정확성을 높이기 위해 타이머를 관리하여 clearTimeout을 사용하여 타이머 취소! 👈
    //         */
    //     } else {
    //         setPreviewData(null)
    //         if (!fullScreen && isHovered) {
    //             setIsHovered(false)
    //         }
    //     }
    //     return () => { if (timer) clearTimeout(timer) }
    // }, [isInside, previewData])
    
    // const openModal = (i, data) => {
    //     setIsInside(true)
    //     let start = false, end = false
    //     if ((i + 1) % 6 === 1) start = true
    //     if ((i + 1) % 6 === 0) end = true
    //     let target = document.getElementsByClassName(i + data.id)[0];
    //     // let targetTop = target.getBoundingClientRect().top
    //     let targetLeft = target.getBoundingClientRect().left
    //     setCoordinate({left: start ? 86 : end ? targetLeft - 97 : targetLeft - 30})
    //     setPreviewData({
    //         id: data.id,
    //         title: data.title || data.name,
    //         backdrop: data.backdrop_path,
    //         voteAvg: data.vote_average,
    //         genreIds: data.genre_ids
    //     })
    // }

    const openModal = (id) => {
        navigate(`/detail?id=${encodeURIComponent(id)}`, {state: { background: location, mType: mType }})
    }
    // console.log('🎀SliderContainer🎀', headerTitle, data);
    return (
        <Container className="slider-container">
            <div className="wrap">
                <h2>{headerTitle}</h2>
                <Slider {...settings}>
                    {data.map((el, i) => (
                        <div className={i+el.id} key={el.id} style={{cursor: 'pointer'}}>
                            <SlickSlide className='slick-slide'>
                                <div onClick={() => openModal(el.id, mType)}>
                                    <ImageCard
                                        id={el.id}
                                        mType={mType}
                                        title={el.title || el.name}
                                        showTitle={true}
                                        imgPath={el.backdrop_path}
                                        height='2.5rem'
                                    />
                                </div>
                                {/* <div className="this">
                                    <Info id={el.id} mType={mType} title={el.title || el.name} voteAvg={el.vote_average.toFixed(1)} genreIds={el.genre_ids} />
                                    <PreviewModal
                                        id={el.id}
                                        mType={mType}
                                        title={el.title || el.name}
                                        backdrop={el.backdrop_path}
                                        voteAvg={el.vote_average.toFixed(1)}
                                        genreIds={el.genre_ids}
                                    />
                                </div> */}
                            </SlickSlide>
                        </div>
                    ))}
                </Slider>
            </div>
        </Container>
    )
})

const Container = styled.div`
    margin: 2vw 0;
    width: 100%;
    & > .wrap {
        position: relative;
        ${media.large`
            padding: 0 60px;
        `}
        ${media.medium`
            padding: 0 40px;
        `}
        ${media.small`
            padding: 0 20px;
        `}

        & > h2 {
            margin: 20px 0 0 0;
            ${media.large`
                font-weight: 400;
                font-size: 1.5rem;
            `}
            ${media.medium`
                font-weight: 400;
                font-size: 1.5rem;
            `}
            ${media.small`
                font-weight: 300;
                font-size: 1rem;
            `}
        }
    }
`

const SlickSlide = styled.div`
    margin: 15px 5px;
    position: sticky;

    & > .this {
        opacity: 0;
        height: 0px;
        width: 100%;
        transition: 0.5s;
    }

    &:hover {
        transition: 0.5s;
        // transform: scale(1.2) translateY(-20px);
        transform: scale(1.2);
        z-index: 999;

        & > .this {
            opacity: 1;
            position: absolute;
            z-index: 999;
            transition: 0.5s;
        }
    }
`