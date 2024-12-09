import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import LoadingOverlay from 'components/ui/LoadingOverlay';
import Slider from 'components/ui/Slider';
import { useNavigate, useParams } from 'react-router-dom';
import { useConetentsQuery, useContentsQueryKey }  from 'hooks/useReactQuery';
import { FaPlay } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import { MainCover, CoverContent, SelectBoxForGenre, CoverContentText } from 'styles/MediaStyle';
import DetailModal from 'components/modal/DetailModal';
import { fetchGenres, fetchSearchByGenre } from 'api/movieApi';
import styled from 'styled-components';
import { getContentImg } from 'utils/CommonFunction';
import { useMediaStore, useGlobalStore } from 'stores/CommonStore';

const Wrapper = styled.div`
    opacity: ${props => props.opacity}
`
const types = [
    { id: 1, type: 'movie', name: '영화', title: ['Now Playing In Theaters', 'Popular', 'Top Rated', 'Upcoming'] },
    { id: 2, type: 'tv', name: '시리즈', title: ['On The Air', 'Popular', 'Top Rated', 'Airing Today'] }
]

function Media () {
    let { id, genreId } = useParams()
    id = parseInt(id)
    const name = types.find(el => el.id === id).name
    const type = types.find(el => el.id === id).type
    console.log('genreId', genreId);
    const { mediaType, setMediaType, openDetailModal, setOpenDetailModal } = useMediaStore()

    useEffect(() => {
        setMediaType(type)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type])

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

    const [coverContents, setCoverContents] = useState({})
    const recieveDataFromSlider = (data) => {
        let randomIndex = Math.floor(Math.random() * data.length)
        let temp = data[randomIndex]
        let coverData = {
            id: temp.id,
            title: temp.title || temp.name,
            img: getContentImg(temp.backdrop_path),
            overview: temp.overview.length > 130 ? temp.overview.slice(0, 130) + '...' : temp.overview
        }
        setCoverContents(coverData)
    }

    return (
        <>
            {/* {openDetailModal && genreBoxRef && <div ref={detailModalRef}><DetailModal id={coverContents.id} type={type} /></div>} */}
            {openDetailModal && <div id="detail-modal" ref={detailModalRef}><DetailModal id={coverContents.id} type={type} /></div>}
            
            <Wrapper className="wrapper" opacity={openDetailModal  ? 0.7 : 1}>
                {/** 중앙 메인 컨텐츠 */}
                <MainContents id={id} mediaType={mediaType} name={name} coverContents={coverContents} />

                {/** 하단 슬라이더 */}
                {genreId ? <div style={{paddingTop: '650px'}}>{genreId}</div>
                : <BottomSlider id={id} type={type} genreId={genreId} sendDataToParent={recieveDataFromSlider} />}
            </Wrapper>
        </>
    )
}

const MainContents = (props) => {
    const {id, mediaType, name, coverContents} = props
    const {data: genres} = useQuery({
        queryKey: ['genres', mediaType],
        queryFn: fetchGenres,
        staleTime: Infinity, // 데이터는 무기한 신선한 상태로 유지
        cacheTime: Infinity, // 캐시 데이터를 무기한 보관
    })
    const {setOpenDetailModal} = useMediaStore()
    
    const [openGenreBox, setOpenGenreBox] = useState(false)
    const [genre, setGenre] = useState({id: -1, name: '장르'})
    useEffect(() => {
        setGenre({id: -1, name: '장르'})
    }, [mediaType])

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
    
    const navigate = useNavigate()
    useEffect(() => {
        // const {data: dataByGenre} = useQuery({queryKey: ['dataByGenre_' + genre.id, mediaType, genre.id], queryFn: fetchSearchByGenre})
        if (genre.id > -1) {
            setOpenGenreBox(false)
            navigate(`/media/${id}/genre/${genre.id}`)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [genre])

    const videoPlay = () => {
        alert('기달')
    }

    return (
        <>
            <MainCover url={coverContents.img}/>

            {/* 중앙 콘텐츠 */}
            <CoverContent id="cover-content">
                {/* 장르 선택 */}
                <SelectBoxForGenre bgcolor={openGenreBox ? 'hsla(0,0%,100%,.1)' : 'black'}>
                    {genre.id === -1 ?
                        <>
                            <span>{name}</span>
                            <div className="selectBox" onClick={() => setOpenGenreBox(true)}>
                                <div className="selectIndex">
                                    <span>{genre.name}</span>
                                    <span style={{float: 'right'}}>▼</span>
                                </div>
                                <div className="selectBoxOptions" ref={genreBoxRef}>
                                    {openGenreBox && genreBoxRef && genres.map((el, i) => <div key={i} onClick={() => setGenre({id: el.id, name: el.name})} style={{padding: '5px'}}><span>{el.name}</span></div>)}
                                </div>
                            </div>
                        </>
                    : <>
                        <div style={{fontSize: '18px', color: 'grey'}}>
                            <span onClick={() => {setGenre({id: -1, name: '장르'}); navigate(`/media/${id}`);}} style={{cursor: 'pointer'}}>{name}</span>
                            <span style={{margin: '0 8px'}}>></span>
                        </div>
                        <span>{genre.name}</span>
                    </>
                    }
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
        </>
    )
}

const BottomSlider = (props) => {
    const {id, type, genreId, sendDataToParent} = props
    // console.log('BottomSlider', id, type, genreId);
    const {movie, tv} = useContentsQueryKey
    // const {isLoading, setIsLoading} = useGlobalStore()
    // console.log('isLoading', isLoading);

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

    useEffect(() => {
        if (!popluarLoading) {
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
                <Slider type={type} name={types.find(el => el.id === id).title[0]} data={nowPlaying} />
            </div>

            <div>
                <Slider type={type} name={types.find(el => el.id === id).title[2]} data={topRated} />
            </div>

            <div>
                <Slider type={type} name={types.find(el => el.id === id).title[1]} data={popluar} />
            </div>

            <div>
                <Slider type={type} name={types.find(el => el.id === id).title[3]} data={upcoming} />
            </div>
        </div>
    )
}

export default Media