import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import styled from 'styled-components'
import { Border } from "styles/IconButtonStyle";
import { GoChevronRight } from "react-icons/go";
import { getContentImg } from "utils/CommonFunction";
import PropTypes from "prop-types";
import { useMediaStore } from "stores/mediaStore";
import { useVideoQuery } from "hooks/useReactQuery"
import MyContentsButton from "components/ui/button/MyContentsButton";
import { YouTubePlayer } from "components/contents/YouTubePlayer";
import { PlayButton } from "components/ui/button/PlayButton";
import { MuteButton } from "components/ui/button/MuteButton";
import { useLocation, useNavigate } from "react-router-dom";

const getGenresById = (data, genres) => {
    // 장르의 id값으로 name 추출
    return data.reduce((acc, curr) => {
        const find = genres.find(g => g.id === curr)
        if (find) acc.push(find.name)
        return acc
    }, [])
}

export const PreviewModal = ({ id, mType, title, backdrop, voteAvg, genreIds }) => {
    // console.log('👉PreviewModal', id, title);
        
    // const {data: videokey, isLoading, isError} = useVideoQuery({type: mType, id: id})
    
    // if (isLoading || isError) return

    const [videokey, setVideokey] = useState(null)
    const recieveVideokey = useCallback((key) => {
        setVideokey(key)
    }, [])

    return (
        <Container>
            {/* <Player backdrop={backdrop} videokey={videokey} /> */}
            <Player id={id} mType={mType} backdrop={backdrop} sendVedioKey={recieveVideokey} />
            <Info id={id} mType={mType} title={title} voteAvg={voteAvg} genreIds={genreIds} videokey={videokey} />
        </Container>
    )
}

// export const Player = ({backdrop, videokey=null}) => {
export const Player = ({id, mType, backdrop, sendVedioKey}) => {
    const { playerState } = useMediaStore()
    const {videokey, isLoading, isError} = useVideoQuery({type: mType, id: id, enabled: true})
    useEffect(() => {
        if (videokey) {
            sendVedioKey(videokey)
        }
    }, [sendVedioKey, videokey])

    if (isLoading || isError) return

    return (
        <PreviewPlayer style={{backgroundImage: `url(${getContentImg(backdrop)})`, backgroundSize: 'cover'}}>
            {videokey && <div style={{opacity: [1,2,3].includes(playerState.state) ? 1 : 0}}><YouTubePlayer videoId={videokey} width="320px" height="180px" /></div>}
        </PreviewPlayer>
    )
}

export const Info = ({id, mType, title, voteAvg, genreIds, videokey=null}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const { playerState } = useMediaStore()

    const queryClient = useQueryClient(); // 캐시된 데이터 가져오기
    const genres = queryClient.getQueryData(['genres', mType]) // 'genres' 키로 데이터 조회
    // const allQueryKeys = queryClient.getQueryCache().getAll().map((query) => query.queryKey)
    
    const genre = useMemo(() => {
        return genres ? getGenresById(genreIds, genres) : []
        
    }, [genreIds, genres])

    const openModal = () => {
        if (videokey && playerState.id === videokey && playerState.state === 1) {
            document.getElementById('video-puause-btn-' + videokey).click()
        }
        navigate(`/detail?id=${encodeURIComponent(id)}`, {state: { background: location, mType: mType }})
    }
    return (
        <PreviewInfo>
            <div style={{display: 'inline-block', width: '100%'}}>
                <div style={{float: 'left', marginRight: '5px'}}><PlayButton active={!!videokey && [1,2,3].includes(playerState.state)} type='icon' /></div>
                <div style={{float: 'left', marginRight: '5px'}}><MyContentsButton id={id} mType={mType} iconSize={30} borderSize={35} /></div>
                <div style={{float: 'left', marginRight: '5px'}}><MuteButton id={id} mType={mType} iconSize={25} borderSize={35} /></div>
                <div style={{float: 'right'}}><Border $iconSize={25} $borderSize={35}><GoChevronRight style={{float: 'right', transform: 'rotate(90deg)'}} onClick={openModal} /></Border></div>
                {/* {like ? <AiFillLike onClick={liked} /> : <AiOutlineLike onClick={liked} />} */}
            </div>
            <div style={{margin: '5px 0 0'}}>
                <div>
                    <span style={{fontSize: '100%'}}>{title}</span>
                    <span style={{marginLeft: '8px'}}>⭐{voteAvg || 0.0}</span>
                </div>
                <ul style={{margin: '5px 0 0'}}>{genre.slice(0,3).map((el, i) => <li key={i} style={{fontSize: '80%'}}>{el}</li>)}</ul>
            </div>
        </PreviewInfo>
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

const Container = styled.div`
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
