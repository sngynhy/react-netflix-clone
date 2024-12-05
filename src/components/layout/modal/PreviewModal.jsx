import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import styled from 'styled-components'
import { FaCirclePlay } from "react-icons/fa6";
import { GoPlusCircle } from "react-icons/go";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { ImEnlarge2 } from "react-icons/im";
import { fetchGenres, fetchVideo } from "api/movieApi";
import { getGenresById, getContentVedio, getContentImg } from "utils/CommonFunction";
import PropTypes from "prop-types";
import { useMovieStore } from "stores/movieStore";

const Wrapper = styled.div`
    border: 1px solid white;
    position: absolute;
    top: 0px;
`
const PreviewPlayer = styled.div`
    width: 382px;
    height: 230px;
`
const PreviewInfo = styled.div`
    height: 100px;
    background: #141414;
    padding: 10px;
    & div > svg {
        height: 2rem;
        width: 2rem;
        margin: 0 5px;
        cursor: pointer;
    }
    & div > ul {
        list-style: none;
        padding: 0;
        display: flex;
        margin-top: 5px;
    }
    & div > ul > li {
        margin-right: 8px;
    }
`

function PreviewModal (props) {
    const { id, ...detail } = props
    // console.log('PreviewModal', id, detail);
    
    const { mediaType } = useMovieStore()
    const queryClient = useQueryClient(); // 캐시된 데이터 가져오기
    const genres = queryClient.getQueryData(['genres', mediaType]) // 'genres' 키로 데이터 조회
    const genre = getGenresById(detail.genre, genres)

    const {data: videokey} = useQuery({
        queryKey: ["video", id],
        queryFn: fetchVideo,
        select: data => data.find(el => el.type === 'Trailer').key
    })
    
    const [like, setLike] = useState(false)
    const liked = () => {
        setLike(prev => !prev)
        // 추가) store에 like 콘텐츠 id 추가
    }

    return (
        <Wrapper>
            <PreviewPlayer>
                <iframe src={getContentVedio(videokey)} width="100%" height="100%" title="preview" style={{border: 'none'}}></iframe>
            </PreviewPlayer>
            <PreviewInfo>
                <div>
                    <FaCirclePlay />
                    <GoPlusCircle />
                    {like ? <AiFillLike onClick={liked} /> : <AiOutlineLike onClick={liked} />}
                    <ImEnlarge2 style={{float: 'right'}} />
                </div>
                <div>
                    <span style={{fontSize: '22px'}}>{detail.title}</span>
                    <span style={{marginLeft: '8px'}}>⭐{detail.voteAvg}</span>
                    <ul>{genre.map((el, i) => <li key={i}>{el}</li>)}</ul>
                </div>
            </PreviewInfo>
        </Wrapper>
    )
}

PreviewModal.prototype = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    overview: PropTypes.string,
    cover: PropTypes.string.isRequired,
    genre: PropTypes.arrayOf(PropTypes.number).isRequired,
    voteAvg: PropTypes.number,
}

// 기본값 지정
PreviewModal.defaultProps = {
    voteAvg: 0,
}


export default PreviewModal