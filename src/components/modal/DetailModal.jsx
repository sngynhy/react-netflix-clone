import React, { useEffect, useRef, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { fetchCreditDetails, fetchContentDetails, fetchRecommendContents } from "api/movieApi"; 
import styled from "styled-components";
import LoadingOverlay from "components/ui/LoadingOverlay";
import { getContentImg, getContentVedio } from "utils/CommonFunction";
import { useVideoQuery } from "hooks/useReactQuery";
import { FaStar } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import PreviewModal from 'components/modal/PreviewModal';
import GridContents from "components/GridContents";
import { useMediaStore } from 'stores/CommonStore';

const Wrapper = styled.div`
    justify-content : center;
    display: flex;
`
const Container = styled.div`
    border: none;
    position: absolute;
    z-index: 999;
    width: 50%;
    top: 30px;
`
const PreviewPlayer = styled.div`
    width: 100%;
    height: 475px;
    background: linear-gradient(0deg, #181818, transparent 50%);
`
const Detail = styled.div`
    display: grid;
    grid-template-columns: minmax(0,2fr) minmax(0,1fr);
    column-gap: 2rem;
`
const Recommend = styled.div`

`

function DetailModal (props) {
    const { id, type } = props
    const isMovie = type === 'movie'
    const {season, setSeason} = useState(0)
    const { setOpenDetailModal } = useMediaStore()

    // detail data
    const {data: detailsData, isLoading: detailsLoading, error: detailsError} = useQuery({ queryKey: [id + '_details', type, id], queryFn: fetchContentDetails })
    console.log('data', detailsData);
    
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
    console.log('details', details);

    // video
    const {data: videokey, isLoading: videoLoading} = useVideoQuery({type: type, id: id})
    console.log('videokey', videokey);

    // credit data
    const {data: creditData, isLoading: creditLoading, error: crditError} = useQuery({ queryKey: [id + '_cast', type, id], queryFn: fetchCreditDetails, enabled: !detailsLoading })
    // console.log('creditData', creditData);

    // recommendData data
    const {data: recommendData, isLoading: recommendLoading, error: recommendError} = useQuery({
        queryKey: [id + "_recommend", type, id],
        queryFn: fetchRecommendContents,
        enabled: !detailsLoading,
        select: data => data.filter(el => !!el.backdrop_path)
    })
    // console.log('recommendData', recommendData)

    const scrollToBottom = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }

    // 컨텐츠 정보
    return (
        <Wrapper className="detail-info">
            {detailsLoading || videoLoading || creditLoading ? <LoadingOverlay /> :
            <Container>
                <PreviewPlayer>
                <IoCloseCircle className="close" onClick={() => setOpenDetailModal(false)} style={{ width: '36px', height: '36px', position: 'absolute', right: '0', margin: '12px', cursor: 'pointer'}} />
                    {videokey
                        ? <iframe src={getContentVedio(videokey)} width="100%" height="100%" title="preview" style={{border: 'none', borderRadius: '8px 8px 0 0'}}></iframe>
                        : <img src={getContentImg(detailsData.backdrop_path)} style={{width: '100%', borderRadius: '8px 8px 0 0'}} alt="backdrop" />
                    }
                    
                </PreviewPlayer>

                <div style={{width: '100%', backgroundColor: '#181818', borderRadius: '0 0 8px 8px'}}>
                    <div style={{padding: '1.5rem'}}>
                        <Detail>
                            <div style={{paddingRight: '1rem'}}>
                                <div style={{display: 'flex', marginBottom: '12px'}}>
                                    <div style={{color: '#fbbc04', marginRight: '1rem'}}><FaStar style={{color: '#fbbc04'}}/><span style={{marginLeft: '6px'}}>{details.voteAvg}</span></div>
                                    <div style={{marginRight: '1rem'}}>{details.releaseDate}</div>
                                    {isMovie
                                        ? <div>{details.runtime}분</div>
                                        : <div>시즌 {details.totolSeasons}개</div>} {/**  (에피소드 {details.totalEpisodeCnt}개) */}
                                </div>
                                <div>
                                    <div>{details.overview}</div>
                                </div>
                            </div>
                            <div style={{fontSize: '14px'}}>
                                <div style={{marginBottom: '10px'}}>
                                    <span style={{color: '#777777', marginRight: '5px'}}>출연:</span>{creditData.cast.slice(0, 3).map(el => <span key={el.id}>{el.name}, </span>)}
                                    <span className="moreView" onClick={scrollToBottom}style={{cursor: 'pointer', borderBottom: '1px solid'}}>더보기</span>
                                </div>
                                <div>
                                    <span style={{color: '#777777', marginRight: '5px'}}>장르:</span>{details.genres.map(el => <span key={el.id}>{el.name}, </span>)}
                                </div>
                            </div>
                        </Detail>

                        {recommendData && 
                            <div style={{margin: '30px 0'}}>
                                <h2>추천 컨텐츠</h2>
                                <div className="gridBox" style={{}}>
                                    <GridContents data={recommendData} showTitle={true} showOverview={false} gridColumns={3} imgPath='backdrop_path' />
                                </div>
                            </div>
                        }

                        <BottomDetails>
                            <h2>{details.title} 상세 정보</h2>
                            <div style={{fontSize: '14px'}}>
                                {detailsData.created_by && <div style={{marginBottom: '10px'}}>
                                    <span style={{color: '#777777', marginRight: '5px'}}>크리에이터:</span>{detailsData.created_by?.map(el => <span>{el.name}, </span>)}
                                </div>}
                                <div style={{marginBottom: '10px'}}>
                                    <span style={{color: '#777777', marginRight: '5px'}}>출연:</span>{creditData.cast.map(el => <span key={el.id}>{el.name}, </span>)}
                                </div>
                                <div style={{marginBottom: '10px'}}>
                                    <span style={{color: '#777777', marginRight: '5px'}}>장르:</span>{details.genres.map(el => <span key={el.id}>{el.name}, </span>)}
                                </div>
                                <div style={{marginBottom: '10px'}}>
                                    <span style={{color: '#777777', marginRight: '5px'}}>제작사:</span>{detailsData.production_companies.map(el => <span key={el.id}>{el.name}, </span>)}
                                </div>
                                {detailsData.networks && <div style={{marginBottom: '10px'}}>
                                    {detailsData.networks.map(el => <span style={{marginRight: '8px', backgroundColor:"white", padding: '3px', borderRadius: '4px'}}><img src={getContentImg(el.logo_path)} style={{width: '35px'}} alt="" /></span> )}
                                </div>}
                            </div>
                        </BottomDetails>
                    </div>
                </div>
            </Container>}
            
        </Wrapper>
    )
}
const BottomDetails = styled.div`

`
export default DetailModal