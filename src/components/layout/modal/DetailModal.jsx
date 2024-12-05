import React, { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { fetchCreditDetails, fetchContentDetails, fetchSimilarContents } from "api/movieApi"; 
import styled from "styled-components";
import LoadingOverlay from "components/ui/LoadingOverlay";
import { getContentImg, getContentVedio } from "utils/CommonFunction";
import { useVideoQuery } from "hooks/useReactQuery";
import { FaStar } from "react-icons/fa6";
import PreviewModal from 'components/layout/modal/PreviewModal';

const Wrapper = styled.div`
    justify-content : center;
    display: flex;
`
const Container = styled.div`
    border: 1px solid white; // none;
    position: absolute;
    z-index: 999;
    width: 50%;
    border-radius: 8px;
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
const Similar = styled.div`

`

function DetailModal (props) {
    const { id, type } = props
    // detail data
    const {data: detailsData, isLoading: detailsLoading, error: detailsError} = useQuery({ queryKey: [id + '_details', type, id], queryFn: fetchContentDetails })
    
    let details = { title: '', genres: [], runtime: 0, overview: '', releaseDate: '', voteAvg: 0 }
    if (!detailsLoading && !detailsError) {
        details.title = detailsData.title || detailsData.name
        details.genres = detailsData.genres
        details.runtime = detailsData.runtime
        details.overview = detailsData.overview
        details.releaseDate = detailsData.release_date
        details.voteAvg = detailsData.vote_average.toFixed(1)
        details.voteCnt = detailsData.vote_count
    }
    // video
    const {data: videokey, isLoading: videoLoading} = useVideoQuery({type: type, id: id})
    console.log('videokey', videokey);
    
    // credit data
    const {data: creditData, isLoading: creditLoading, error: crditError} = useQuery({ queryKey: [id + '_cast', type, id], queryFn: fetchCreditDetails, enabled: !detailsLoading })
    // console.log('creditData', creditData);

    // similar data
    const {data: similarData, isLoading: similarLoading, error: similarError} = useQuery({
        queryKey: [id + "_similar", type, id],
        queryFn: fetchSimilarContents,
        enabled: !detailsLoading,
        select: data => data.filter(el => !!el.backdrop_path)
    })
    // console.log('similarData', similarData)



    // 컨텐츠 정보
    return (
        <Wrapper>
            {detailsLoading || videoLoading || creditLoading ? <LoadingOverlay /> :
            <Container>
                <PreviewPlayer>
                    {videokey
                        ? <iframe src={getContentVedio(videokey)} width="100%" height="100%" title="preview" style={{border: 'none'}}></iframe>
                        : <img src={getContentImg(detailsData.backdrop_path)} style={{width: '100%'}} alt="backdrop" />
                    }
                    
                </PreviewPlayer>

                <div style={{width: '100%', backgroundColor: '#181818'}}>
                    <div style={{padding: '1.5rem'}}>
                        <Detail>
                            <div style={{paddingRight: '1rem'}}>
                                <div style={{display: 'flex', marginBottom: '12px'}}>
                                    <div style={{color: '#fbbc04', marginRight: '1rem'}}><FaStar style={{color: '#fbbc04'}}/><span style={{marginLeft: '6px'}}>{details.voteAvg}</span></div>
                                    <div style={{marginRight: '1rem'}}>{details.releaseDate}</div>
                                    <div>{details.runtime}분</div>
                                </div>
                                <div>
                                    <div>{details.overview}</div>
                                </div>
                            </div>
                            <div style={{fontSize: '14px'}}>
                                <div style={{marginBottom: '10px'}}>
                                    <span style={{color: '#777777', marginRight: '5px'}}>출연:</span>{creditData.cast.slice(0, 3).map(el => <span key={el.id}>{el.name}, </span>)}
                                    <span className="moreView">더보기</span>
                                </div>
                                <div>
                                    <span style={{color: '#777777', marginRight: '5px'}}>장르:</span>{details.genres.map(el => <span key={el.id}>{el.name}, </span>)}
                                </div>
                            </div>
                        </Detail>

                        {similarData && 
                            <Similar>
                            <h2>추천 컨텐츠</h2>
                            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px'}}>
                                {similarData.map(el => {
                                    return (
                                    <div>
                                        <img loading="lazy" src={getContentImg(el.backdrop_path)} alt="포스터" width='100%'/>
                                        <div key={el.id}>{el.title}</div>
                                    </div>
                                    )
                                })}
                            </div>
                        </Similar>}
                    </div>
                </div>
            </Container>}
            
        </Wrapper>
    )
}

export default DetailModal