import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import SliderContents from './SliderContents';

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
    const {name, data} = props
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
                                id={el.id}
                                title={el.title}
                                originTitle={el.original_title}
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

export default Slider