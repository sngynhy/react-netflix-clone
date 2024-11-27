import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Movie from 'components/Movie';
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const Wrapper = styled.div`
    position: relative;
    display: flex;
    overflow: hidden;
    width: 100%;
    & > .side-icon {
        position: absolute;
        z-index:  2;
        top: calc(50% - 40px);;
        height: 80px;
        width: 20px;
        padding: 5px;
    }
    & > .prev-btn {
        left: 0; // 5px;
    }
    & > .next-btn {
        right: 0;
    }
    & > .side-icon:hover {
        border-radius: 8px;
        background-color: rgba(0, 0, 0, 0.5);
        cursor: pointer;
    }
`

const Container = styled.div`
    display: flex;
    transform: translateX(${props => props.position}%);
    transition: transform 0.5s ease-in-out;
`

function Slider (props) {
    const [sliderPosition, setSliderPosition] = useState(0)
    
    useEffect(() => {
        if (sliderPosition < -61.5) setSliderPosition(-61.5)
        else if (sliderPosition > 0) setSliderPosition(0)
    }, [sliderPosition])

    // 슬라이더 위치 업데이트 > 한 줄에 7개 포스터 출력됨
    function onClickPrevBtn () {
        setSliderPosition(prev => prev + 35)
    }
    function onClickNextvBtn () {
        setSliderPosition(prev => prev - 35)
    }

    return (
        <Wrapper>
            <FaChevronLeft className="side-icon prev-btn" onClick={onClickPrevBtn} />
            <Container position={sliderPosition}>
                {
                    props.data.map((el, i) => {
                        return <Movie
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
            </Container>
            <FaChevronRight className="side-icon next-btn" onClick={onClickNextvBtn} />
        </Wrapper>
    )
}

export default Slider