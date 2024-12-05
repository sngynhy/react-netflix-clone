import React, { useEffect, useRef, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingOverlay from 'components/ui/LoadingOverlay';
import Slider from 'components/layout/Slider';
import { useParams } from 'react-router-dom';
import { useReactQuery, movieQueryKey_nowplaying, movieQueryKey_popular, movieQueryKey_topRated, movieQueryKey_upcomming,
    tvQueryKey_airingToday, tvQueryKey_onTheAir, tvQueryKey_popular, tvQueryKey_topRated } from 'hooks/useReactQuery';
import { FaPlay } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import { MainCover, CoverContent, SelectBoxForGenre, CoverContentText } from 'styles/MediaStyle';
import DetailModal from 'components/layout/modal/DetailModal';

const type = [
    { id: 1, name: '영화' },
    { id: 2, name: '시리즈' }
]

function Media () {
    let { id } = useParams()
    id = parseInt(id)
    const name = type.find(el => el.id === id).name

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
    
    // 캐시된 데이터 가져오기
    const queryClient = useQueryClient()
    const genres = queryClient.getQueryData(['genres']) // 'genres' 키로 데이터 조회

    const {data: nowPlaying, isLoading: nowPlayingLoading, error: nowPlayingError} = useReactQuery({key: id === 1 ? movieQueryKey_nowplaying : tvQueryKey_onTheAir})
    const {data: upcomming, isLoading: upcommingLoading, error: upcommingError} = useReactQuery({key: id === 1 ? movieQueryKey_upcomming : tvQueryKey_airingToday})
    const {data: popluar, isLoading: popluarLoading, error: popluarError} = useReactQuery({key: id === 1 ? movieQueryKey_popular : tvQueryKey_popular})
    const {data: topRated, isLoading: topRatedLoading, error: topRatedError} = useReactQuery({key: id === 1 ? movieQueryKey_topRated : tvQueryKey_topRated})
    
    if (nowPlayingLoading || upcommingLoading || popluarLoading || topRatedLoading) return <LoadingOverlay />;
    if (nowPlayingError || upcommingError || popluarError || topRatedError) return <p>Error occurred!</p>;
    
    // 메인 커버 컨텐츠 추출
    let random = 0, coverContents = { title: '', img: '', overview: ''}
    if (!nowPlayingLoading) {
        // random = Math.floor(Math.random() * nowPlaying.length)
        let temp = nowPlaying[random]
        coverContents.title = id === 1 ? temp.title : temp.name
        coverContents.img = `https://image.tmdb.org/t/p/original` + temp.backdrop_path
        coverContents.overview = temp.overview.length > 130 ? temp.overview.slice(0, 130) + '...' : temp.overview
    }
    return (
        <>
            <MainCover url={coverContents.img}/>
            {/* <DetailModal data={nowPlaying[0]} /> */}

            {/* 중앙 콘텐츠 */}
            <CoverContent id="cover-content">
                {/* 장르 선택 */}
                <SelectBoxForGenre>
                    <span>{name}</span>
                    <div className="selectBox" onClick={() => setOpenGenreBox(prev => !prev)}>
                        <div style={{padding: '5px 10px'}}>
                            <span>{genre}</span>
                            <span style={{float: 'right'}}>▼</span>
                        </div>
                        <div className="selectBoxOptions" ref={genreBoxRef}>
                            {openGenreBox && genreBoxRef && genres.map(el => <div key={el.id} onClick={() => setGenre(el.name)} style={{padding: '5px'}}><span style={{borderBottom: '1px solid white'}}>{el.name}</span></div>)}
                        </div>
                    </div>
                </SelectBoxForGenre>
                {/* 메인 커버 컨텐츠 */}
                <CoverContentText>
                    <h2>{coverContents.title}</h2>
                    <p>{coverContents.overview}</p>
                    <div style={{marginTop: '30px'}}>
                        <button className="btn playBtn"><FaPlay />재생</button>
                        <button className="btn detailBtn" onClick={() => setOpenDetailModal(true)}><FiInfo />상세정보</button>
                    </div>
                </CoverContentText>
            </CoverContent>

            <div style={{paddingTop: '650px'}}>
                <div>
                    <Slider name="현재 상영작" data={nowPlaying} />
                </div>

                <div>
                    <Slider name="인기있는" data={popluar} />
                </div>

                <div>
                    <Slider name="별점순" data={topRated} />
                </div>

                <div>
                    <Slider name="개봉 예정작" data={upcomming} />
                </div>
            </div>
        </>
    )
}
export default Media