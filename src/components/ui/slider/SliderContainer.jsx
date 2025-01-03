import React, { useState, useRef, useEffect, useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PreviewModal } from "components/modal/PreviewModal";
import { BackdropImage } from "components/contents/BackdropImage";
import styled from "styled-components";
import { useMediaStore } from "stores/mediaStore";
import { settings } from './SliderSettings'

export const SliderContainer = React.memo(({mType, headerTitle, data}) => {
    const { fullScreen } = useMediaStore()
    const [isHovered, setIsHovered] = useState(false)
    const [isInside, setIsInside] = useState(false)
    const [previewData, setPreviewData] = useState(null)
    const [coordinate, setCoordinate] = useState({})
    const previewRef = useRef(null)
    
    useEffect(() => {
        let timer
        if (isInside) {
            timer = setTimeout(() => { if (timer) setIsHovered(true) }, 1000)
            /**
             * ✅ setTimeout 안에서 사용하는 변수는 타이머가 설정된 시점의 상태 값을 캡처함!
             *      방법 1) 최신 상태 값을 참조 위해서는 Ref 활용!
             *      방법 2) 동작의 정확성을 높이기 위해 타이머를 관리하여 clearTimeout을 사용하여 타이머 취소! 👈
            */
        } else {
            setPreviewData(null)
            if (!fullScreen && isHovered) {
                setIsHovered(false)
            }
        }
        return () => { if (timer) clearTimeout(timer) }
    }, [isInside, previewData])
    
    const openModal = (i, data) => {
        setIsInside(true)
        let start = false, end = false
        if ((i + 1) % 6 === 1) start = true
        if ((i + 1) % 6 === 0) end = true
        let target = document.getElementsByClassName(i + data.id)[0];
        // let targetTop = target.getBoundingClientRect().top
        let targetLeft = target.getBoundingClientRect().left
        setCoordinate({left: start ? 86 : end ? targetLeft - 97 : targetLeft - 30})
        setPreviewData({
            id: data.id,
            title: data.title || data.name,
            backdrop: data.backdrop_path,
            voteAvg: data.vote_average,
            genreIds: data.genre_ids
        })
    }
    // console.log('🎀SliderContainer🎀', headerTitle, data);
    return (
        <div className="slider-container" style={{margin: '3vw 0', width: '100%'}}>
            <div style={{padding: "0 60px", position: "relative"}}>
                <h2>{headerTitle}</h2>
                <Slider {...settings}>
                    {data.map((el, i) => (
                        <div className={i+el.id} key={el.id} onMouseEnter={() => openModal(i, el)} onMouseLeave={(e) => { if (!isHovered) setIsInside(false) }} style={{cursor: 'pointer'}}>
                            <div className='slick-slide' style={{margin: '15px 5px', transition: '0.5s ease', transform: isInside && el.id === previewData.id ? 'scale(1.2)' : 'scale(1)', zIndex: isInside && el.id === previewData.id ? 99 : 0, position: 'sticky'}}>
                                <BackdropImage
                                    id={el.id}
                                    mType={mType}
                                    title={el.title || el.name}
                                    showTitle={mType === 'netflix' ? false : true}
                                    imgPath={mType === 'netflix' ? el.poster_path : el.backdrop_path}
                                    width='120px'
                                    height='40px'
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
                <Preview ref={previewRef} onMouseLeave={() => setIsInside(false)} style={{left: coordinate.left, transform: isHovered ? 'scale(1.2)' : 'scale(0)'}}>
                {/* <Preview onMouseLeave={closeModal} $left={coordinate.left} $isHovered={isHovered}> */}
                    {isHovered && previewData && <PreviewModal
                        id={previewData.id}
                        mType={mType}
                        title={previewData.title}
                        backdrop={previewData.backdrop}
                        voteAvg={previewData.voteAvg.toFixed(1)}
                        genreIds={previewData.genreIds}
                    />}
                </Preview>
            </div>
        </div>
    )
})

const Preview = styled.div`
    position: absolute;
    width: 262px;
    height: 147px;
    top: 0;
    // left: ${props => props.$left};
    transition: transform 1s ease;
    // transform: ${props => props.$isHovered ? 'scale(1.2)' : 'scale(0)'};
    z-index: 10;
`