import React, { useEffect, useRef, useState } from 'react'
import styled from "styled-components";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingOverlay from 'components/ui/LoadingOverlay';
import Slider from 'components/layout/Slider';
import { useParams } from 'react-router-dom';
import useMovieQuery, { useMovieQueryKey_nowplaying, useMovieQueryKey_popular, useMovieQueryKey_topRated, useMovieQueryKey_upcomming } from 'hooks/useReactQuery';
import { FaPlay } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";

const Wrapper = styled.div`

`

const MainCover = styled.div`
    background-image: url(${props => props.url});
    background-size: cover;
    height: 800px;
    width: 100%;
    margin-bottom: 0px;
    mask-image: linear-gradient(180deg, #181818, transparent 90%); // linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.4));
    mask-size: 100% 120%;
    mask-repeat: no-repeat;
    position: absolute;
    z-index: 0;
`

const Container = styled.div`
    padding-top: 650px;
`

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
    	function outSideClick(e) {
            if (genreBoxRef.current && !genreBoxRef.current.contains(e.target)) {
                setOpenGenreBox(false)
            }
        }
        // 이벤트 리스너에 outSideClick 함수 등록
        document.addEventListener("mousedown", outSideClick);
        return () => { document.removeEventListener("mousedown", outSideClick); }
    }, [genreBoxRef])
    
    // 캐시된 데이터 가져오기
    const queryClient = useQueryClient();
    const genres = queryClient.getQueryData(['genres']); // 'genres' 키로 데이터 조회
    
    const {data: nowPlaying, isLoading: nowPlayingLoading, error: nowPlayingError} = useMovieQuery({key: useMovieQueryKey_nowplaying})
    const {data: popluar, isLoading: popluarLoading, error: popluarError} = useMovieQuery({key: useMovieQueryKey_popular})
    const {data: topRated, isLoading: topRatedLoading, error: topRatedError} = useMovieQuery({key: useMovieQueryKey_topRated})
    const {data: upcomming, isLoading: upcommingLoading, error: upcommingError} = useMovieQuery({key: useMovieQueryKey_upcomming})

    // const {data: netflix, isLoading: netflixLoading, error: netflixError} = useQuery({ queryKey: ['netflix'], queryFn: fetchNetflixOriginal })
    
    if (nowPlayingLoading || popluarLoading || topRatedLoading || upcommingLoading) return <LoadingOverlay />;
    if (nowPlayingError || popluarError || topRatedError || upcommingError) return <p>Error occurred!</p>;
    
    // 메인 커버 컨텐츠 추출
    let random, coverContents = { title: '', img: '', overview: ''}
    if (!nowPlayingLoading) {
        random = Math.floor(Math.random() * nowPlaying.length)
        let temp = nowPlaying[random]
        coverContents.title = id === 1 ? temp.title : temp.name
        coverContents.img = `https://image.tmdb.org/t/p/original` + temp.backdrop_path
        coverContents.overview = temp.overview.length > 130 ? temp.overview.slice(0, 130) + '...' : temp.overview
    }
    console.log('coverContents', coverContents);
    return (
        <Wrapper>
            <MainCover url={coverContents.img}/>

            {/* 중앙 콘텐츠 */}
            <div id="cover-content" style={{position:'absolute', zIndex: 1, marginTop: '80px', width: '100%', height: '650px'}}> {/** , height: '650px' */}
                {/* 장르 선택 */}
                <div id="" style={{padding: '0 60px', alignItems: 'center', display: 'flex', flexDirection: 'row', flexGrow: 1, justifyContent: 'flex-start'}}>
                    <span style={{fontSize: '38px', marginRight: '15px'}}>{name}</span>
                    <div style={{border: '1px solid white', width: '95px', margin: '0 30px', cursor: 'pointer', display: 'inline-block', position: 'relative', backgroundColor: openGenreBox ? 'rgba(0, 0, 0, 0.4)' : 'black'}} onClick={() => setOpenGenreBox(prev => !prev)}>
                        <div style={{padding: '5px 10px'}}>
                            <span>{genre}</span>
                            <span style={{float: 'right'}}>▼</span>
                        </div>
                        <div ref={genreBoxRef} style={{position: 'absolute', zIndex: 3, top: '32px', backgroundColor: 'black', width: '150px'}}>
                            {openGenreBox && genres.map(el => <div key={el.id} onClick={() => setGenre(el.name)} style={{padding: '5px'}}><span style={{borderBottom: '1px solid white'}}>{el.name}</span></div>)}
                        </div>
                    </div>
                </div>
                {/* 메인 커버 컨텐츠 */}
                <div style={{padding: '0 60px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'flex-start', position: 'absolute', bottom: '30%'}}>
                    <h2 style={{fontSize: '50px', margin: '8px 15px 0 0'}}>{coverContents.title}</h2>
                    <p style={{width: '40%', fontSize: '20px', margin: '0 15px 0 0'}}>{coverContents.overview}</p>
                    <div style={{marginTop: '30px'}}>
                        <button style={{marginRight: '10px', padding: '0.6rem 1.6rem', fontSize: '20px', borderRadius: '4px', border: 'none', cursor: 'pointer'}}><FaPlay style={{marginRight: '8px'}} />재생</button>
                        <button style={{marginRight: '10px', padding: '0.6rem 1.6rem', fontSize: '20px', borderRadius: '4px', border: 'none', cursor: 'pointer', color: 'white', backgroundColor: 'rgba(109, 109, 110, 0.7)'}}><FiInfo style={{marginRight: '8px'}} />상세정보</button>
                    </div>
                </div>
            </div>

            <Container>
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
            </Container>
        </Wrapper>
    )
}

export default Media