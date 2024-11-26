import React from "react";
import styled from "styled-components";
import Movie from 'components/Movie';
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const Wrapper = styled.div`
    position: relative;
    display: flex;
    & > .side-icon-left {
        position: absolute;
        z-index:  2;
        top: calc(50% - 40px);
        left: 0;
        height: 80px;
        width: 20px;
        padding: 5px;
    }
    & > .side-icon-right {
        position: absolute;
        z-index:  2;
        top: calc(50% - 40px);;
        right: 0;
        height: 80px;
        width: 20px;
        padding: 5px;
    }
    & > .side-icon:hover {
        border-radius: 8px;
        background-color: rgba(0, 0, 0, 0.5);
        cursor: pointer;
    }
`
function Slider (props) {
    return (
        <Wrapper>
            <FaChevronLeft className="side-icon side-icon-left" />
            {
                props.data.map((el, i) => {
                    return <Movie
                    key={el.id}
                    id={el.id}
                    title={el.name}
                    originTitle={el.original_name}
                    overview={el.overview}
                    poster={el.poster_path}
                    genre={el.genre_ids}
                    voteAvg={el.vote_average}
                    voteCnt={el.vote_count} />
                })
            }
            <FaChevronRight className="side-icon side-icon-right" />
        </Wrapper>
    )
}

export default Slider