import React, { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { fetchCreditDetails, fetchContentDetails, fetchRecommendContents } from "api/mediaApi"; 
import { getContentImg } from "utils/CommonFunction";
import { useVideoQuery } from "hooks/useReactQuery";
import { FaStar } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import GridContents from "components/contents/GridContents";
import { useMediaStore } from 'stores/mediaStore';
import {Wrapper, PreviewPlayer, IconsOnPlayer, MoreDiv, Span} from 'styles/DetailModal'
import { MyContentsButton } from "components/ui/button/MyContentsButton";
import { PlayButton } from 'components/ui/button/PlayButton';
import { YouTubePlayer } from "components/contents/YouTubePlayer";
import { LogoImage } from "components/contents/LogoImage";
import { MuteButton } from "components/ui/button/MuteButton";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";

export const DetailModal = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const id = searchParams.get('id'), mType = location.state.mType
    // console.log('🎈 DetailModal', id, mType, location);

    const detailModalRef = useRef(null)
    useEffect(() => {
        // 특정 영역 외 클릭 시 이벤트 발생
        const outSideClick = (e) => {
            if (detailModalRef.current && !detailModalRef.current.contains(e.target)) {
                navigate(location.state.background || -1)
            }
        }
        // esc 키 입력 시 이벤트 발생
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                navigate(location.state.background || -1)
            }
        }
        // 이벤트 리스너에 함수 등록
        document.addEventListener("mousedown", outSideClick)
        document.addEventListener("keydown", handleKeyDown)
        return () => {
            document.removeEventListener("mousedown", outSideClick)
            document.removeEventListener("keydown", handleKeyDown)
        }
        
    }, [detailModalRef, navigate, location])

    // detail data
    const {data: detailsData, isLoading: detailsLoading, error: detailsError} = useQuery({ queryKey: ['details', mType, id], queryFn: fetchContentDetails })
    const details = useMemo(() => {
        let temp = { id: id, title: '', genres: [], runtime: 0, overview: '', releaseDate: '', voteAvg: 0 }
        if (detailsData) {
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
    }, [detailsData, id])

    // credit data
    const {data: creditData, isLoading: creditLoading, error: crditError} = useQuery({ queryKey: ['cast', mType, id], queryFn: fetchCreditDetails }) // , enabled: !detailsLoading 
    // console.log('creditData', creditData);

    const [height, setHeight] = useState('100vh')
    useEffect(() => {
        if (!detailModalRef.current) return
        
        const targetNode = detailModalRef.current
        
        // ResizeObserver 생성
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                if (entry.target === targetNode) {
                    const newHeight = entry.contentRect.height // 새로운 높이
                    setHeight(newHeight + 30 - 241 - 1 + 'px')
                }
            }
        })
        
        // 대상 요소 관찰 시작
        resizeObserver.observe(targetNode)
        
        // 크기 변경 감지
        return () => {
            resizeObserver.disconnect()
        }
    }, [detailsData, creditData, details, location])
        
    if (detailsLoading || creditLoading || detailsError || crditError) return <></>

    return (
        <div id="detail-modal" style={{width: '100%', height: height}}>
            <Helmet>
                <title>{details.title + ' - 넷플릭스'}</title>
            </Helmet>

            <Wrapper className="detail-container">
                <div ref={detailModalRef}>
                {detailsData && creditData && <>
                    {/* 최상단 커버 영상 */}
                    <PreviewContent id={id} mType={mType} imgPath={detailsData.backdrop_path} title={details.title}/>

                    <div style={{width: '100%', backgroundColor: '#181818', borderRadius: '0 0 8px 8px'}}>
                        <div style={{padding: '2rem'}}>
                            {/* 상단 요약 정보 */}
                            <TopInfo mType={mType} details={details} creditData={creditData} />

                            {/* 추천 콘텐츠 */}
                            <RecommendSection id={id} mType={mType} />

                            {/* 하단 디테일 정보 */}
                            <BottomDetail mType={mType} details={details} detailsData={detailsData} creditData={creditData} />
                        </div>
                    </div>
                </>}
                </div>
            </Wrapper>
        </div>
    )
}

const PreviewContent = React.memo(({ id, mType, imgPath, title }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const { playable, playerState, videoCurrentTime } = useMediaStore()

    // video
    const {data: videokey, isLoading: videoLoading} = useVideoQuery({type: mType, id: id, enabled: true})
    // console.log('videokey >>', videokey);
    
    if (videoLoading) return

    const closeModal = () => {
        // console.log('closeModal', location);
        if (videokey && playerState.id === videokey && playerState.state === 1) {
            document.getElementById('video-stop-btn-' + videokey).click()
        }
        navigate(location.state.background || -1)
    }
    return (
        <PreviewPlayer>
            {/* 영상 or 이미지 콘텐츠 */}
            <div style={{height: '100%', position: 'relative'}}>
                <div style={{backgroundImage: `url(${getContentImg(imgPath)})`, backgroundSize: 'cover', width: '100%', height: '479px', borderRadius: "8px 8px 0 0"}}>
                    {videokey && <div style={{opacity: playerState.id === videokey && playerState.state === 1 ? 1 : 0}}><YouTubePlayer videoId={videokey} startTime={videoCurrentTime} borderRadius="8px 8px 0 0" /></div>}
                </div>
                <div style={{position: 'absolute', width: '60%', bottom : 100, left: '3rem' }}>
                    <LogoImage id={id} mType={mType} alt={title} width='15rem' height='8rem' lowerTitle={false} fontSize='32px' />
                </div>
            </div>
            {/* 버튼 */}
            <IconsOnPlayer>
                <div className="close-btn"><IoCloseOutline onClick={closeModal} /></div>
                <div className="bottom-btns">
                    <div style={{marginRight: '10px'}}><PlayButton active={videokey && playerState.id === videokey && playable} /></div>
                    <div style={{marginRight: '10px'}}><MyContentsButton id={id} mType={mType} /></div>
                    {videokey && <MuteButton />}
                </div>
            </IconsOnPlayer>
        </PreviewPlayer>
    )
})

const TopInfo = React.memo(({mType, details, creditData}) => {
    const navigate = useNavigate()
    const location = useLocation()

    const scrollToBottom = () => {
        const location = document.querySelector("#bottomDetail").offsetTop
        window.scrollTo({ top: location, behavior: "smooth" })
    }

    const openSearchModal = (type, props) => {
        if (type === 'person') {
            navigate(`/search/md/person?id=${encodeURIComponent(props.id)}`, {state: { background: location.state.background, condition: 'person', title: props.name }})
        } else {
            navigate(`/search/md/genre?id=${encodeURIComponent(props.id)}`, {state: { background: location.state.background, condition: 'genre', title: props.name, mType: mType }})
        }
    }
    return (
        <div style={{display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)', columnGap: '2rem'}}>
            <div style={{paddingRight: '1rem'}}>
                <div style={{display: 'flex', marginBottom: '12px'}}>
                    <div style={{color: '#fbbc04', marginRight: '1rem'}}><FaStar style={{color: '#fbbc04'}}/><span style={{marginLeft: '6px'}}>{details.voteAvg}</span></div>
                    <div style={{marginRight: '1rem'}}>{details.releaseDate}</div>
                    {mType === 'movie'
                        ? <div>{details.runtime}분</div>
                        : <div>시즌 {details.totolSeasons}개</div>} {/**  (에피소드 {details.totalEpisodeCnt}개) */}
                </div>
                <div>{details.overview}</div>
            </div>
            <div style={{fontSize: '14px'}}>
                {creditData.cast.length !== 0 &&
                <div style={{marginBottom: '10px'}}>
                    <span style={{color: '#777777', marginRight: '5px'}}>출연:</span>{creditData.cast.slice(0, 3).map(el => <Span key={el.id} onClick={() => openSearchModal('person', el)}>{el.name}, </Span>)}
                    <span className="moreView" onClick={scrollToBottom}style={{cursor: 'pointer', borderBottom: '1px solid', color: 'grey', fontStyle: 'italic'}}>더보기</span>
                </div>}
                {details.genres.length !== 0 &&
                <div>
                    <span style={{color: '#777777', marginRight: '5px'}}>장르:</span>{details.genres.map(el => <Span key={el.id} onClick={() => openSearchModal(mType, el)}>{el.name}, </Span>)}
                </div>
                }
            </div>
        </div>
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

    if (recommendLoading || recommendError) return <></>
    
    return (
        <div id="recommendSection" style={{margin: '30px 0'}}>
            <h2>추천 콘텐츠</h2>
            <div className="gridBox">
                <GridContents data={recommendData?.slice(0, 9)} mType={mType} showTitle={true} showPlayButton={true} showOverview={true} gridColumns={3} hoverEffect={false} borderRadius='6px 6px 0 0' />
                {moreViewRecommend && <GridContents data={recommendData?.slice(9, recommendData.lenght)} mType={mType} showTitle={true} showPlayButton={true} showOverview={true} gridColumns={3} hoverEffect={false} borderRadius='6px 6px 0 0' />}
                <MoreDiv $moreview={moreViewRecommend} ><TfiArrowCircleLeft onClick={moreView}/></MoreDiv>
            </div>
        </div>
    )
})

const BottomDetail = React.memo(({mType, details, detailsData, creditData}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const openSearchModal = (type, props) => {
        if (type === 'person') {
            navigate(`/search/md/person?id=${encodeURIComponent(props.id)}`, {state: { background: location.state.background, condition: 'person', title: props.name }})
        } else {
            navigate(`/search/md/genre?id=${encodeURIComponent(props.id)}`, {state: { background: location.state.background, condition: 'genre', title: props.name, mType: mType }})
        }
    }
    return (
        <div id="bottomDetail">
            <h2>{details.title} 상세 정보</h2>
            <div style={{fontSize: '14px'}}>
                {detailsData?.created_by?.length > 0 &&
                <div style={{marginBottom: '10px'}}>
                    <span style={{color: '#777777', marginRight: '5px'}}>크리에이터:</span>{detailsData.created_by?.map(el => <span key={el.id}>{el.name}, </span>)}
                </div>}
                {creditData?.cast?.length > 0 &&
                <div style={{marginBottom: '10px'}}>
                    <span style={{color: '#777777', marginRight: '5px'}}>출연:</span>
                    {creditData.cast.length < 30 ? creditData.cast.map(el => <Span key={el.id} onClick={() => openSearchModal('person', el)}>{el.name}, </Span>) : creditData.cast.slice(0,30).map(el => <Span key={el.id} onClick={() => openSearchModal('person', el)}>{el.name}, </Span>)}
                </div>}
                {details?.genres?.length > 0 &&
                <div style={{marginBottom: '10px'}}>
                    <span style={{color: '#777777', marginRight: '5px'}}>장르:</span>{details.genres.map(el => <Span key={el.id} onClick={() => openSearchModal(mType, el)}>{el.name}, </Span>)}
                </div>}
                {detailsData?.production_companies?.length > 0 &&
                <div style={{marginBottom: '10px'}}>
                    <span style={{color: '#777777', marginRight: '5px'}}>제작사:</span>{detailsData.production_companies.map(el => <span key={el.id}>{el.name}, </span>)}
                </div>}
                {detailsData?.networks?.length > 0 &&
                <div style={{marginBottom: '10px', display: 'grid', gridTemplateColumns: 'repeat(18, 1fr)', gap: '5px'}}>
                    {/* {detailsData.networks.map((el, i) => <span key={i} style={{marginRight: '8px', backgroundColor:"white", padding: '3px', borderRadius: '4px'}}><img src={getContentImg(el.logo_path)} style={{width: '35px'}} alt={el.name} /></span> )} */}
                    {detailsData.networks.map((el, i) => <span key={i}><img src={getContentImg(el.logo_path)} style={{width: '35px'}} alt={el.name} /></span> )}
                </div>}
            </div>
        </div>
    )
})