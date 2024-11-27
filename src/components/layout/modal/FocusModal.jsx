import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import styled from 'styled-components'
import { FaCirclePlay } from "react-icons/fa6";
import { GoPlusCircle } from "react-icons/go";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { ImEnlarge2 } from "react-icons/im";
import { fetchVideo } from "api/movieApi";
import { getGenresById } from "utils/CommonFunction";

const Wrapper = styled.div`
    // border: 3px solid white;
    border: none;
    position: absolute;
    z-index: 2;
    top: ${props => props.top};
    left: ${props => props.left};
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
    }
    & div > ul > li {
        margin-right: 5px;
    }
`

function FocusModal (props) {
    const { id, detail, left, top } = props
    
    // 캐시된 데이터 가져오기
    const queryClient = useQueryClient();
    const genres = queryClient.getQueryData(['genres']); // 'genres' 키로 데이터 조회
    const genre = getGenresById(detail.genre, genres)

    const {data: key} = useQuery({
        queryKey: ["video", id],
        queryFn: fetchVideo,
        select: data => data.find(el => el.type === 'Trailer').key
    })
    const URL = `https://youtube.com/embed/${key}?autoplay=1&mute=1&controls=0&fs=0&modestbranding=0&rel=0&loop=3`
    
    const [like, setLike] = useState(false)

    return (
        <Wrapper top={top}>
            <PreviewPlayer>
                <iframe src={URL} width="100%" height="100%" title="preview" style={{border: 'none'}}></iframe>
            </PreviewPlayer>
            <PreviewInfo>
                <div>
                    <FaCirclePlay />
                    <GoPlusCircle />
                    {like ? <AiFillLike onClick={() => setLike(true)} /> : <AiOutlineLike onClick={() => setLike(false)} />}
                    <ImEnlarge2 style={{float: 'right'}} />
                </div>
                <div>
                    <span>{detail.title}</span>
                    <span style={{marginLeft: '8px'}}>⭐{detail.voteAvg}</span>
                    <ul>{genre.map(el => <li>{el}</li>)}</ul>
                </div>
            </PreviewInfo>
        </Wrapper>
    )
}
// 확대해서 재생
// 찜하기
// 좋아요
// 상세 정보
export default FocusModal