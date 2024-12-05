import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import LoadingOverlay from 'components/ui/LoadingOverlay';
import Slider from 'components/layout/Slider';
import { useParams } from 'react-router-dom';
import { useConetentsQuery, useContentsQueryKey }  from 'hooks/useReactQuery';
import { FaPlay } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import { MainCover, CoverContent, SelectBoxForGenre, CoverContentText } from 'styles/MediaStyle';
import DetailModal from 'components/layout/modal/DetailModal';
import { fetchGenres } from 'api/movieApi';
import styled from 'styled-components';
import { getContentImg } from 'utils/CommonFunction';
import { useMovieStore } from 'stores/movieStore';

const Wrapper = styled.div`
opacity: ${props => props.opacity}
`
const types = [
    { id: 1, type: 'movie', name: '영화', title: ['Now Playing In Theaters', 'Popular', 'Top Rated', 'Upcoming'] },
    { id: 2, type: 'tv', name: '시리즈', title: ['On The Air', 'Popular', 'Top Rated', 'Airing Today'] }
]
function Media () {
    let { id } = useParams()
    id = parseInt(id)
    const name = types.find(el => el.id === id).name
    const type = types.find(el => el.id === id).type
    
    const { mediaType, setMediaType } = useMovieStore()
    useEffect(() => {
        setMediaType(type)
    }, [type])

    const {data: genres} = useQuery({
        queryKey: ['genres', mediaType],
        queryFn: fetchGenres,
        staleTime: Infinity, // 데이터는 무기한 신선한 상태로 유지
        cacheTime: Infinity, // 캐시 데이터를 무기한 보관
    })

    const [openGenreBox, setOpenGenreBox] = useState(false)
    const [genre, setGenre] = useState('장르')
    const genreBoxRef = useRef(null)
    useEffect(() => {
        // 특정 영역 외 클릭 시 이벤트 발생
    	const outSideClick = (e) => {
            if (genreBoxRef.current && !genreBoxRef.current.contains(e.target)) {
                setOpenGenreBox(false)
            }
        }
        // 이벤트 리스너에 outSideClick 함수 등록
        document.addEventListener("mousedown", outSideClick);
        return () => { document.removeEventListener("mousedown", outSideClick); }
    }, [genreBoxRef])
    

    const [openDetailModal, setOpenDetailModal] = useState(false)
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
    }, [detailModalRef])

    const {movie, tv} = useContentsQueryKey
    const {data: nowPlaying, isLoading: nowPlayingLoading, error: nowPlayingError} = useConetentsQuery({
        key: id === 1 ? movie.nowPlaying : tv.onTheAir,
        type: type,
        content: id === 1 ? movie.nowPlaying : tv.onTheAir
    })
    const {data: popluar, isLoading: popluarLoading, error: popluarError} = useConetentsQuery({
        key: id === 1 ? movie.popular : tv.popular,
        type: type,
        content: id === 1 ? movie.popular : tv.popular
    })
    const {data: topRated, isLoading: topRatedLoading, error: topRatedError} = useConetentsQuery({
        key: id === 1 ? movie.topRated : tv.topRated,
        type: type,
        content: id === 1 ? movie.topRated : tv.topRated
    })
    const {data: upcoming, isLoading: upcomingLoading, error: upcomingError} = useConetentsQuery({
        key: id === 1 ? movie.upcoming : tv.airingToday,
        type: type,
        content: id === 1 ? movie.upcoming : tv.airingToday
    })

    // 메인 커버 컨텐츠 추출
    let coverContents = {id: '', title: '', img: '', overview: ''}
    if (popluar) {
        let randomIndex = Math.floor(Math.random() * popluar.length)
        console.log('ㅇㅇ또 타 계속 타', );
        let temp = popluar[randomIndex]
        coverContents.id = temp.id
        coverContents.title = temp.title || temp.name
        coverContents.img = getContentImg(temp.backdrop_path)
        coverContents.overview = temp.overview.length > 130 ? temp.overview.slice(0, 130) + '...' : temp.overview
    }
    
    if (nowPlayingLoading || upcomingLoading || popluarLoading || topRatedLoading) return <LoadingOverlay />;
    if (nowPlayingError || upcomingError || popluarError || topRatedError) return <p>Error occurred!</p>;

    const videoPlay = () => {
        console.log('videoPlay', coverContents);
    }

    return (
        <>
            {openDetailModal && genreBoxRef && <div ref={detailModalRef}><DetailModal id={coverContents.id} type={type} /></div>}
            
            <Wrapper opacity={openDetailModal  ? 0.7 : 1}>
                <MainCover url={coverContents.img}/>

                {/* 중앙 콘텐츠 */}
                <CoverContent id="cover-content">
                    {/* 장르 선택 */}
                    <SelectBoxForGenre>
                        <span>{name}</span>
                        <div className="selectBox" onClick={() => setOpenGenreBox(prev => !prev)}>
                            <div className="selectIndex">
                                <span>{genre}</span>
                                <span style={{float: 'right'}}>▼</span>
                            </div>
                            <div className="selectBoxOptions" ref={genreBoxRef}>
                                {openGenreBox && genreBoxRef && genres.map(el => <div key={el.id} onClick={() => setGenre(el.name)} style={{padding: '5px'}}><span>{el.name}</span></div>)}
                            </div>
                        </div>
                    </SelectBoxForGenre>
                    {/* 메인 커버 컨텐츠 */}
                    <CoverContentText>
                        <h2>{coverContents.title}</h2>
                        <p>{coverContents.overview}</p>
                        <div style={{marginTop: '30px'}}>
                            <button className="btn playBtn" onClick={videoPlay}><FaPlay />재생</button>
                            <button className="btn detailBtn" onClick={() => setOpenDetailModal(true)}><FiInfo />상세정보</button>
                        </div>
                    </CoverContentText>
                </CoverContent>

                <div style={{paddingTop: '650px'}}>
                    <div>
                        <Slider name={types.find(el => el.id === id).title[0]} data={nowPlaying} />
                    </div>

                    <div>
                        <Slider name={types.find(el => el.id === id).title[1]} data={popluar} />
                    </div>

                    <div>
                        <Slider name={types.find(el => el.id === id).title[2]} data={topRated} />
                    </div>

                    <div>
                        <Slider name={types.find(el => el.id === id).title[3]} data={upcoming} />
                    </div>
                </div>
            </Wrapper>
        </>
    )
}

export default Media