import React, { useEffect, useRef, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { fetchCreditDetails, fetchContentDetails, fetchRecommendContents } from "api/movieApi"; 
import LoadingOverlay from "components/ui/LoadingOverlay";
import { getContentImg } from "utils/CommonFunction";
import { useVideoQuery } from "hooks/useReactQuery";
import { FaStar } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import GridContents from "components/contents/GridContents";
import { useMediaStore } from 'stores/CommonStore';
import {Wrapper, Container, PreviewPlayer, PlayerOnIcons, Detail, MoreDiv} from 'styles/DetailModal'
import MyContentsButton from "components/ui/MyContentsButton";
import PlayButton from 'components/ui/PlayButton';
import { YouTubePlayer } from "components/contents/YouTubePlayer";

function DetailModal (props) {
    const { id, mType } = props
    // const {season, setSeason} = useState(0)
    // detail data
    const {data: detailsData, isLoading: detailsLoading, error: detailsError} = useQuery({ queryKey: [id + '_details', mType, id], queryFn: fetchContentDetails })
    // console.log('data', detailsData);
    let details = { title: '', genres: [], runtime: 0, overview: '', releaseDate: '', voteAvg: 0 }
    if (!detailsLoading && !detailsError) {
        details.title = detailsData.title || detailsData.name
        details.genres = detailsData.genres
        details.runtime = detailsData.runtime || null // detailsData.episode_run_time[0]
        details.overview = detailsData.overview
        details.releaseDate = detailsData.release_date || detailsData.first_air_date + ' ~ ' + detailsData.last_air_date
        details.voteAvg = detailsData.vote_average.toFixed(1)
        details.voteCnt = detailsData.vote_count
        details.totalEpisodeCnt = detailsData.number_of_episodes || null
        details.totolSeasons = detailsData.number_of_seasons || null
    }
    // console.log('details', details);

    // credit data
    const {data: creditData, isLoading: creditLoading, error: crditError} = useQuery({ queryKey: [id + '_cast', mType, id], queryFn: fetchCreditDetails, enabled: !detailsLoading })
    // console.log('creditData', creditData);

    const scrollToBottom = () => {
        const location = document.querySelector("#bottomDetail").offsetTop
        window.scrollTo({ top: location, behavior: "smooth" })
    }

    // 콘텐츠 정보
    return (
        <Wrapper className="detail-info">
            {detailsLoading || creditLoading ? <LoadingOverlay /> :
            <Container>
                <PreviewContent id={id} mType={mType} imgPath={detailsData.backdrop_path} />

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
            </Container>}
        </Wrapper>
    )
}

const PreviewContent = ({ id, mType, imgPath }) => {

    const { readyToPlay, endPlay, setOpenDetailModal } = useMediaStore()

    // video
    const {data: videokey, isLoading: videoLoading} = useVideoQuery({type: mType, id: id})
    // console.log('videokey', videokey);

    return (
        <PreviewPlayer>
            {/* 영상 or 이미지 콘텐츠 */}
            <div style={{height: '100%'}}>
                {videokey && !endPlay ? <YouTubePlayer videoId={videokey} style={{borderRadius: '8px 8px 0 0'}} /> 
                : <img src={getContentImg(imgPath)} style={{width: '100%', borderRadius: '8px 8px 0 0'}} alt="backdrop" />}
            </div>
            {/* 버튼 */}
            <PlayerOnIcons>
                <IoCloseCircle className="closeBtn" onClick={() => setOpenDetailModal(false)} />
                <div style={{height: '46px'}}>
                    <PlayButton active={videokey && readyToPlay} />
                    <MyContentsButton id={id} width="auto" height="100%" />
                </div>
            </PlayerOnIcons>
        </PreviewPlayer>
    )
}

const RecommendSection = (props) => {
    const {id, mType} = props
    // recommendData data
    const {data: recommendData, isLoading: recommendLoading, error: recommendError} = useQuery({
        queryKey: [id + "_recommend", mType, id],
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

    if (recommendLoading) return <LoadingOverlay />
    if (recommendError) return <h1></h1>

    return (
        <div id="recommendSection" style={{margin: '30px 0'}}>
            <h2>추천 콘텐츠</h2>
            <div className="gridBox">
                <GridContents data={recommendData.slice(0, 9)} showTitle={true} showOverview={true} gridColumns={3} imgPath='backdrop_path' />
                {moreViewRecommend && <GridContents data={recommendData.slice(9, recommendData.lenght)} showTitle={true} showOverview={true} gridColumns={3} imgPath='backdrop_path' />}
                <MoreDiv moreview={moreViewRecommend} ><TfiArrowCircleLeft onClick={moreView}/></MoreDiv>
            </div>
        </div>
    )
}
export default DetailModal