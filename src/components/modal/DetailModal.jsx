import React, { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { fetchCreditDetails, fetchContentDetails, fetchRecommendContents } from "api/movieApi"; 
import { getContentImg } from "utils/CommonFunction";
import { useVideoQuery } from "hooks/useReactQuery";
import { FaStar } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import GridContents from "components/contents/GridContents";
import { useMediaStore } from 'stores/mediaStore';
import {Wrapper, Container, PreviewPlayer, IconsOnPlayer, Detail, MoreDiv} from 'styles/DetailModal'
import MyContentsButton from "components/ui/MyContentsButton";
import { PlayButton } from 'components/ui/PlayButton';
import { YouTubePlayer } from "components/contents/YouTubePlayer";
import { LogoImage } from "components/contents/LogoImage";

function DetailModal () {
    const { openContentId, mediaType, setOpenDetailModal } = useMediaStore()
    const id = openContentId, mType = mediaType

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

    // detail data
    const {data: detailsData, isLoading: detailsLoading, error: detailsError} = useQuery({ queryKey: ['details', mType, id], queryFn: fetchContentDetails })
    const details = useMemo(() => {
        let temp = { id: id, title: '', genres: [], runtime: 0, overview: '', releaseDate: '', voteAvg: 0 }
        if (detailsData && !detailsLoading) {
            temp.title = detailsData.title || detailsData.name
            temp.genres = detailsData.genres
            temp.runtime = detailsData.runtime || null // detailsData.episode_run_time[0]
            temp.overview = detailsData.overview
            temp.releaseDate = detailsData.release_date || detailsData.first_air_date + ' ~ ' + detailsData.last_air_date
            temp.voteAvg = detailsData.vote_average.toFixed(1)
            temp.voteCnt = detailsData.vote_count
            temp.totalEpisodeCnt = detailsData.number_of_episodes || null
            temp.totolSeasons = detailsData.number_of_seasons || null
        }
        return temp
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detailsData])

    // credit data
    const {data: creditData, isLoading: creditLoading, error: crditError} = useQuery({ queryKey: ['cast', mType, id], queryFn: fetchCreditDetails, enabled: !detailsLoading })
    // console.log('creditData', creditData);

    if (detailsLoading || creditLoading) return null
    if (detailsError || crditError) return <div>Error</div>

    const scrollToBottom = () => {
        const location = document.querySelector("#bottomDetail").offsetTop
        window.scrollTo({ top: location, behavior: "smooth" })
    }

    // 콘텐츠 정보
    return (
        <Wrapper id="detail-info">
            {detailsData &&
            <Container className="container">
                <div ref={detailModalRef}>
                    <PreviewContent id={id} mType={mType} imgPath={detailsData.backdrop_path} title={details.title}/>

                    <div style={{width: '100%', backgroundColor: '#181818', borderRadius: '0 0 8px 8px'}}>
                        <div style={{padding: '2rem'}}>
                            {/* 상단 요약 정보 */}
                            <Detail>
                                <div style={{paddingRight: '1rem'}}>
                                    <div style={{display: 'flex', marginBottom: '12px'}}>
                                        <div style={{color: '#fbbc04', marginRight: '1rem'}}><FaStar style={{color: '#fbbc04'}}/><span style={{marginLeft: '6px'}}>{details.voteAvg}</span></div>
                                        <div style={{marginRight: '1rem'}}>{details.releaseDate}</div>
                                        {mType === 'movie'
                                            ? <div>{details.runtime}분</div>
                                            : <div>시즌 {details.totolSeasons}개</div>} {/**  (에피소드 {details.totalEpisodeCnt}개) */}
                                    </div>
                                    <div>
                                        <div>{details.overview}</div>
                                    </div>
                                </div>
                                <div style={{fontSize: '14px'}}>
                                    {creditData.cast.length !== 0 &&
                                    <div style={{marginBottom: '10px'}}>
                                        <span style={{color: '#777777', marginRight: '5px'}}>출연:</span>{creditData.cast.slice(0, 3).map(el => <span key={el.id}>{el.name}, </span>)}
                                        <span className="moreView" onClick={scrollToBottom}style={{cursor: 'pointer', borderBottom: '1px solid', color: 'grey', fontStyle: 'italic'}}>더보기</span>
                                    </div> }
                                    <div>
                                        <span style={{color: '#777777', marginRight: '5px'}}>장르:</span>{details.genres.map(el => <span key={el.id}>{el.name}, </span>)}
                                    </div>
                                </div>
                            </Detail>
                            
                            {/* 추천 콘텐츠 */}
                            <RecommendSection id={id} mType={mType} />

                            {/* 하단 디테일 정보 */}
                            <div id="bottomDetail">
                                <h2>{details.title} 상세 정보</h2>
                                <div style={{fontSize: '14px'}}>
                                    {detailsData.created_by &&
                                    <div style={{marginBottom: '10px'}}>
                                        <span style={{color: '#777777', marginRight: '5px'}}>크리에이터:</span>{detailsData.created_by?.map(el => <span key={el.id}>{el.name}, </span>)}
                                    </div>}
                                    {creditData.cast.length !== 0 &&
                                    <div style={{marginBottom: '10px'}}>
                                        <span style={{color: '#777777', marginRight: '5px'}}>출연:</span>{creditData.cast.map(el => <span key={el.id}>{el.name}, </span>)}
                                    </div>}
                                    {details.genres &&
                                    <div style={{marginBottom: '10px'}}>
                                        <span style={{color: '#777777', marginRight: '5px'}}>장르:</span>{details.genres.map(el => <span key={el.id}>{el.name}, </span>)}
                                    </div>}
                                    {detailsData.production_companies &&
                                    <div style={{marginBottom: '10px'}}>
                                        <span style={{color: '#777777', marginRight: '5px'}}>제작사:</span>{detailsData.production_companies.map(el => <span key={el.id}>{el.name}, </span>)}
                                    </div>}
                                    {detailsData.networks &&
                                    <div style={{marginBottom: '10px'}}>
                                        {detailsData.networks.map((el, i) => <span key={i} style={{marginRight: '8px', backgroundColor:"white", padding: '3px', borderRadius: '4px'}}><img src={getContentImg(el.logo_path)} style={{width: '35px'}} alt={el.name} /></span> )}
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>}
        </Wrapper>
    )
}

const PreviewContent = React.memo(({ id, mType, imgPath, title }) => {

    const { readyToPlay, setOpenDetailModal } = useMediaStore()

    // video
    const {data: videokey, isLoading: videoLoading} = useVideoQuery({type: mType, id: id})
    // console.log('videokey >>', videokey);

    const [lowerTitle, setLowerTitle] = useState(false)
    if (videoLoading) return

    setTimeout(() => {
        setLowerTitle(true)
    }, 2000)

    return (
        <PreviewPlayer>
            {/* 영상 or 이미지 콘텐츠 */}
            <div style={{height: '100%', position: 'relative'}}>
                {/* {videokey && !endPlay ? <YouTubePlayer videoId={videokey} style={{opacity: '1'}} borderRadius="8px 8px 0 0" /> */}
                <div>
                    {videokey
                    ? <YouTubePlayer videoId={videokey} imgPath={imgPath} id={id} mType={mType} alt={title} style={{opacity: '1'}} borderRadius="8px 8px 0 0" />
                    : <img src={getContentImg(imgPath)} style={{width: '100%', height: '475px', borderRadius: '8px 8px 0 0'}} alt="backdrop" />
                    }
                </div>
                <div style={{position: 'absolute', width: '60%', bottom : 100, left: '3rem' }}>
                    <LogoImage id={id} mType={mType} alt={title} width='320px' height='150px' lowerTitle={lowerTitle} />
                </div>
                <div className="playBtn">
                </div>
            </div>
            {/* 버튼 */}
            <IconsOnPlayer>
                <IoCloseCircle className="closeBtn" onClick={() => setOpenDetailModal(false)} />
                <div style={{height: '46px'}}>
                    <PlayButton active={videokey && readyToPlay} />
                    <MyContentsButton id={id} mType={mType} width="auto" height="100%" />
                </div>
            </IconsOnPlayer>
        </PreviewPlayer>
    )
})

const RecommendSection = React.memo(({id, mType}) => {

    // recommendData data
    const {data: recommendData, isLoading: recommendLoading, error: recommendError} = useQuery({
        queryKey: ["recommend", mType, id],
        queryFn: fetchRecommendContents,
        select: data => data.filter(el => !!el.backdrop_path)
    })
    // console.log('recommendData', recommendData)

    const [moreViewRecommend, setMoreViewRecommend] = useState(false)
    const moreView = () => {
        if (moreViewRecommend) {
            const location = document.querySelector("#recommendSection").offsetTop
            window.scrollTo({ top: location, behavior: "smooth" })
        }
        setMoreViewRecommend(prev => !prev)
    }

    if (recommendLoading || recommendError) return null
    
    return (
        <div id="recommendSection" style={{margin: '30px 0'}}>
            <h2>추천 콘텐츠</h2>
            <div className="gridBox">
                <GridContents data={recommendData?.slice(0, 9)} mType={mType} showTitle={true} showPlayButton={true} showOverview={true} gridColumns={3} imgPath='backdrop_path' />
                {moreViewRecommend && <GridContents data={recommendData?.slice(9, recommendData.lenght)} showPlayButton={true} showTitle={true} showOverview={true} gridColumns={3} imgPath='backdrop_path' />}
                <MoreDiv $moreview={moreViewRecommend} ><TfiArrowCircleLeft onClick={moreView}/></MoreDiv>
            </div>
        </div>
    )
})
export default DetailModal