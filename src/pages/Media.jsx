import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import LoadingOverlay from 'components/ui/LoadingOverlay';
import Slider from 'components/ui/Slider';
import { useNavigate, useParams } from 'react-router-dom';
import { useConetentsQuery, useContentsQueryKey, useConetentsByGenreQuery }  from 'hooks/useReactQuery';
import { FaPlay } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import DetailModal from 'components/modal/DetailModal';
import { fetchGenres } from 'api/movieApi';
import styled from 'styled-components';
import { getContentImg } from 'utils/CommonFunction';
import { useMediaStore, useGlobalStore } from 'stores/CommonStore';
import MainContent from 'components/contents/media/MainContent';

const Wrapper = styled.div`
    opacity: ${props => props.opacity}
`
const mediaTypes = {
    movie: { name: '영화', title: ['Now Playing In Theaters', 'Popular', 'Top Rated', 'Upcoming'] },
    tv: { name: '시리즈', title: ['On The Air', 'Popular', 'Top Rated', 'Airing Today'] }
}

function Media () {
    let { mType, genreId } = useParams()
    const { openDetailModal, setOpenDetailModal } = useMediaStore()
    
    const detailModalRef = useRef(null)
    useEffect(() => {
        // 특정 영역 외 클릭 시 이벤트 발생
    	const outSideClick = (e) => {
            if (detailModalRef.current && !detailModalRef.current.contains(e.target)) {
                setOpenDetailModal(false)
            }
        }
        // 이벤트 리스너에 outSideClick 함수 등록
        document.addEventListener("mousedown", outSideClick);
        return () => { document.removeEventListener("mousedown", outSideClick); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detailModalRef])

    const [coverContent, setCoverContent] = useState({})
    const recieveDataFromSliderForCoverContent = (data) => {
        let randomIndex = Math.floor(Math.random() * data.length)
        let temp = data[randomIndex]
        let coverData = {
            id: temp.id,
            title: temp.title || temp.name,
            img: getContentImg(temp.backdrop_path),
            overview: temp.overview.length > 130 ? temp.overview.slice(0, 130) + '...' : temp.overview
        }
        setCoverContent(coverData)
    }

    return (
        <div>
            {/* {openDetailModal && genreBoxRef && <div ref={detailModalRef}><DetailModal id={coverContents.id} type={type} /></div>} */}
            {openDetailModal && <div id="detail-modal" ref={detailModalRef}><DetailModal id={coverContent.id} mType={mType} /></div>}
            
            <Wrapper opacity={openDetailModal ? 0.7 : 1}>
                {/** 중앙 메인 콘텐츠 */}
                <MainContent mType={mType} name={mediaTypes[mType].name} genreId={genreId} coverContent={coverContent} />

                {/** 하단 슬라이더 */}
                {genreId ? <SliderSectionByGenre mType={mType} genreId={genreId} sendDataToParent={recieveDataFromSliderForCoverContent} />
                : <SliderSection mType={mType} sendDataToParent={recieveDataFromSliderForCoverContent} />}
            </Wrapper>
        </div>
    )
}

const SliderSection = (props) => {
    const {mType, sendDataToParent} = props
    // console.log('SliderSection', id, type);
    const {movie, tv} = useContentsQueryKey
    // const {isLoading, setIsLoading} = useGlobalStore()
    // console.log('isLoading', isLoading);

    const {data: nowPlaying, isLoading: nowPlayingLoading, error: nowPlayingError} = useConetentsQuery({
        key: mType === 'movie' ? movie.nowPlaying : tv.onTheAir,
        type: mType,
        content: mType === 'movie' ? movie.nowPlaying : tv.onTheAir
    })
    const {data: popluar, isLoading: popluarLoading, error: popluarError} = useConetentsQuery({
        key: mType === 'movie' ? movie.popular : tv.popular,
        type: mType,
        content: mType === 'movie' ? movie.popular : tv.popular
    })
    const {data: topRated, isLoading: topRatedLoading, error: topRatedError} = useConetentsQuery({
        key: mType === 'movie'? movie.topRated : tv.topRated,
        type: mType,
        content: mType === 'movie' ? movie.topRated : tv.topRated
    })
    const {data: upcoming, isLoading: upcomingLoading, error: upcomingError} = useConetentsQuery({
        key: mType === 'movie' ? movie.upcoming : tv.airingToday,
        type: mType,
        content: mType === 'movie' ? movie.upcoming : tv.airingToday
    })

    useEffect(() => {
        if (!topRatedLoading) {
            sendDataToParent(topRated)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topRated])

    // setIsLoading(nowPlayingLoading || upcomingLoading || popluarLoading || topRatedLoading)

    if (nowPlayingLoading || upcomingLoading || popluarLoading || topRatedLoading) return <LoadingOverlay />;
    if (nowPlayingError || upcomingError || popluarError || topRatedError) return <p>Error occurred!</p>;

    return (
        <div style={{paddingTop: '650px'}}>
            <div>
                <Slider mType={mType} name={mediaTypes[mType].title[0]} data={nowPlaying} />
            </div>

            <div>
                <Slider mType={mType} name={mediaTypes[mType].title[2]} data={topRated} />
            </div>

            <div>
                <Slider mType={mType} name={mediaTypes[mType].title[1]} data={popluar} />
            </div>

            <div>
                <Slider mType={mType} name={mediaTypes[mType].title[3]} data={upcoming} />
            </div>
        </div>
    )
}

const SliderSectionByGenre = (props) => {
    const {mType, genreId, sendDataToParent} = props
    const {genreName} = useMediaStore()

    const {data: data, isLoading: isLoading, error: error} = useConetentsByGenreQuery({ type: mType, genreId: genreId })
    
    useEffect(() => {
        if (!isLoading) {
            sendDataToParent(data)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    if (isLoading) return <LoadingOverlay />;
    if (error) return <p>Error occurred!</p>;

    return (
        <>
        {data &&
            <div style={{paddingTop: '650px'}}>
                <div>
                    <Slider mType={mType} name={genreName + ' 콘텐츠'} data={data} />
                </div>
            </div>}
        </>
    )
}
export default Media