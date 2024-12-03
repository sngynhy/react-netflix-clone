import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Movies from 'components/layout/SliderContents';
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import MovieList from "./SearchContents";

const Wrapper = styled.div`
    position: relative;
    // padding: 0 3.5rem;
    
    & > p {
        font-size: 1.4vw;
        padding: 0 3rem;
        margin: 0px;
    }
    & > div > span > svg {
        width: 3rem;
        height: 3rem;
    }
    & > div > span:hover {
        cursor: pointer;
        // background: hsla(0, 0%, 8%, .5);
    }
    
    // & > .side-icon {
    //     position: absolute;
    //     // z-index:  1;
    //     top: calc(50% - 40px);
    //     width: calc(100% + 60px);
    //     left: -30px;
    //     background-color: rgba(0, 0, 0, 0);
    // }
    // & > .side-icon > svg {
    //     height: 2rem;
    //     width: 2rem;
    //     padding: 5px;
    // }
    // & > .side-icon > .prev-btn {
    //     float: left;
    // }
    // & > .side-icon > .next-btn {
    //     float: right;
    // }
    // & > .side-icon > .prev-btn:hover, .side-icon > .next-btn:hover {
    //     border-radius: 8px;
    //     background-color: rgba(255, 255, 255, 0.3);
    //     cursor: pointer;
    // }
`
const Container = styled.div`
    overflow: hidden;
`
const Contents = styled.div`
    display: flex;
    transform: translateX(${props => props.position}%);
    transition: transform 0.5s ease-in-out;
`

function Slider (props) {
    const {name, data} = props
    const count = 7 // 한 화면에 출력되는 포스터 이미지 수
    const [sliderIndex, setSliderIndex] = useState(0)
    const [sliderPosition, setSliderPosition] = useState(0)
    
    const lastSliderIndex = Math.ceil(data.length / count), lastSliderPosition = 231 * (data.length - count)

    // 슬라이더 위치 업데이트 > Container width === 231 * props.data.length
    function onClickPrevBtn () {
        // setSliderIndex(prev => prev - 1 > 0 ? prev - 1 : 0)
        // setSliderPosition(prev => prev + 35 > 0 ? prev + 35 : 0)
        setSliderIndex(prev => prev - 1)
        setSliderPosition(prev => prev + 35)
    }
    function onClickNextvBtn () {
        // setSliderIndex(prev => prev + 1 < lastSliderIndex ? prev + 1 : lastSliderIndex)
        // setSliderPosition(prev => prev - 35 < lastSliderPosition ? prev - 35 : lastSliderPosition)
        setSliderIndex(prev => prev + 1)
        setSliderPosition(prev => prev - 35)
    }

    return (
        <Wrapper>
            {/* <div className="side-icon">
                <GoChevronLeft className="prev-btn" onClick={onClickPrevBtn} />
                <GoChevronRight className="next-btn" onClick={onClickNextvBtn} />
            </div> */}
            <p>{name}</p>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <span><GoChevronLeft onClick={onClickPrevBtn} /></span>
                <Container>
                    {/* <FaChevronLeft className="side-icon prev-btn" onClick={onClickPrevBtn} /> */}
                    <Contents position={sliderPosition}>
                        {/* {
                            data.map((el, i) => {
                                return <Movies
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
                        } */}
                        {
                            data.map((el, i) => {
                                return <MovieList
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
                    {/* <FaChevronRight className="side-icon next-btn" onClick={onClickNextvBtn} /> */}
                </Container>
                <span><GoChevronRight onClick={onClickNextvBtn} /></span>
            </div>
        </Wrapper>
    )
}

export default Slider