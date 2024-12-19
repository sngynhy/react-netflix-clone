import React, { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import styled from 'styled-components'
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { ImEnlarge2 } from "react-icons/im";
import { fetchGenres, fetchVideo } from "api/movieApi";
import { getContentImg } from "utils/CommonFunction";
import PropTypes from "prop-types";
import { useMediaStore } from "stores/mediaStore";
import { useVideoQuery } from "hooks/useReactQuery"
import MyContentsButton from "components/ui/MyContentsButton";
import { YouTubePlayer } from "components/contents/YouTubePlayer";
import { PlayButton } from "components/ui/PlayButton";

const Wrapper = styled.div`
    position: absolute;
    top: 0px;
`
const PreviewPlayer = styled.div`
    width: 320px;
    height: 180px;
`
const PreviewInfo = styled.div`
    height: 100px;
    background: #141414;
    padding: 10px;
    & div > svg {
        height: 1.5rem;
        width: 1.5rem;
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

const getGenresById = (data, genres) => {
    // 장르의 id값으로 name 추출
    return data.reduce((acc, curr) => {
        const find = genres.find(g => g.id === curr)
        if (find) acc.push(find.name)
        return acc
    }, [])
}


function PreviewModal ({ id, mType, title, backdrop, voteAvg, genreIds }) {
    // console.log('PreviewModal', id, mType, title, backdrop, voteAvg, genreIds);
    const { readyToPlay, endPlay, setOpenDetailModal } = useMediaStore()

    const queryClient = useQueryClient(); // 캐시된 데이터 가져오기
    const genres = queryClient.getQueryData(['genres', mType]) // 'genres' 키로 데이터 조회
    // const allQueryKeys = queryClient.getQueryCache().getAll().map((query) => query.queryKey)

    const genre = useMemo(() => {
        return genres ? getGenresById(genreIds, genres) : []
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, genreIds, genres])

    const {data: videokey, isLoading, isError} = useVideoQuery({type: mType, id: id})
    // console.log('videokey', id, videokey);

    const [like, setLike] = useState(false)
    const liked = () => setLike(prev => !prev)
    
    if (isLoading || isError) return

    return (
        <Wrapper>
            <PreviewPlayer style={{backgroundImage: `url(${getContentImg(backdrop)})`, backgroundSize: 'cover'}}>
                {videokey && !endPlay && <YouTubePlayer videoId={videokey} width="320px" height="180px" />}
                {/* // : <img src={getContentImg(backdrop)} style={{width: '100%', height: '100%'}} alt="backdrop" />} */}
            </PreviewPlayer>
            <PreviewInfo>
                <div>
                    <PlayButton active={videokey && readyToPlay} type='icon' />
                    <MyContentsButton id={id} mType={mType} width='2.5rem' height='2.5rem' />
                    {/* {like ? <AiFillLike onClick={liked} /> : <AiOutlineLike onClick={liked} />} */}
                    <ImEnlarge2 style={{float: 'right'}} onClick={() => setOpenDetailModal(true)} />
                </div>
                <div>
                    <span style={{fontSize: '20px'}}>{title}</span>
                    <span style={{marginLeft: '8px'}}>⭐{voteAvg || 0.0}</span>
                    <ul>{genre.map((el, i) => <li key={i}>{el}</li>)}</ul>
                </div>
            </PreviewInfo>
        </Wrapper>
    )
}

PreviewModal.prototype = {
    id: PropTypes.number.isRequired,
    mType: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    backdrop: PropTypes.string.isRequired,
    genreIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    voteAvg: PropTypes.number,
}

export default PreviewModal