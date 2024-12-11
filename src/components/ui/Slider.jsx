import React, { useRef, useState } from "react";
import styled from "styled-components";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { getContentImg } from "utils/CommonFunction";
import PreviewModal from "components/modal/PreviewModal";

const Wrapper = styled.div`
    position: relative;
    margin: 50px 0;

    & > p {
        font-size: 1.4vw;
        padding: 0 3rem;
        margin: 0 0 20px 0;
    }
    & > div > span > svg {
        width: 3rem;
        height: 3rem;
    }
    & > div > span:hover {
        cursor: pointer;
        // background: hsla(0, 0%, 8%, .5);
    }
`
const Container = styled.div`
    overflow: hidden;
`
const Contents = styled.div`
    display: grid;
    grid-auto-flow: column;
    gap: 15px;
    transform: translateX(${props => props.position}px);
    transition: transform 0.5s ease-in-out;
`

function Slider (props) {
    const {mType, name, data} = props
    const count = 7 // 한 화면에 출력되는 포스터 이미지 수
    const [sliderIndex, setSliderIndex] = useState(1)
    const [sliderPosition, setSliderPosition] = useState(0)
    
    const lastSliderIndex = Math.ceil(data.length / count), lastSliderPosition = -(data.length - count) * 230

    // 슬라이더 위치 업데이트 > sliderIndex * 230px * 7
    const onClickPrevBtn = () => {
        if (sliderIndex  > 1) {
            setSliderIndex(prev => prev - 1)
            setSliderPosition(prev => prev + (230 * 7))
        } else {
            setSliderPosition(0)
        }
    }
    const onClickNextvBtn = () => {
        if (sliderIndex < lastSliderIndex) {
            setSliderIndex(prev => prev + 1)
            setSliderPosition(prev => prev - (230 * 7))
        } else (
            setSliderPosition(prev => lastSliderPosition)
        )
    }

    return (
        <Wrapper>
            <p>{name}</p>
            <div style={{display: 'flex', alignItems: 'center'}}>
                {/* < */}
                <span><GoChevronLeft onClick={onClickPrevBtn} /></span>
                {/* 포스터 출력 */}
                <Container>
                    <Contents position={sliderPosition}>
                        {
                            data.map((el, i) => {
                                return <SliderContents
                                key={el.id}
                                mType={mType}
                                id={el.id}
                                title={el.title || el.name}
                                originTitle={el.original_title || el.original_name}
                                overview={el.overview}
                                poster={el.poster_path}
                                genre={el.genre_ids}
                                voteAvg={el.vote_average.toFixed(1)}
                                voteCnt={el.vote_count} />
                            })
                        }
                    </Contents>
                </Container>
                {/* > */}
                <span><GoChevronRight onClick={onClickNextvBtn} /></span>
            </div>
        </Wrapper>
    )
}

const SliderContents = (props) => {
    const {id, mType, ...detail} = props
    const [openPreviewmodal, setOpenPreviewmodal] = useState(false)
    const posterRef = useRef(null)
    
    return (
        <div id="slider" style={{display: 'flex', position: 'relative'}}>
            <Poster ref={posterRef} onMouseEnter={() => setOpenPreviewmodal(true)} onMouseLeave={() => setOpenPreviewmodal(false)}>
            {/* <Poster ref={posterRef} onClick={() => setOpenPreviewmodal(true)}> */}
                <img loading="lazy" src={getContentImg(detail.poster)} alt={detail.title} />
                <div className="fadeIn">
                    {openPreviewmodal && <PreviewModal mType={mType} id={id} detail={detail} /> }
                </div>

                {/* {<Link to={`/movie-detail/${id}`}><img src={POSTER_URL + poster} /></Link>} */}
                {/* <h2><Link to='/movie-detail' state={{ title, overview, poster, genres }}>{title} ({originTitle})</Link></h2> */}
            </Poster>
        </div>
    )
}

const Poster = styled.div`
    flex-shrink: 0;
    scroll-snap-align: start;
    display: flex;
    & > img {
        cursor: pointer;
        width: 215px;
    }
    & > .fadeIn {
        opacity: 1; // 0;
        transition: 0.5s;
        position: absolute;
        z-index: 10;
        left: -78px;
    }
    & > img:hover + .fadeIn {
        opacity: 1;
    }
`
export default Slider