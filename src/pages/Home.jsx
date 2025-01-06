import React, { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchNetflixOriginal } from 'api/movieApi';
import styled from "styled-components";
import { SliderContainer } from 'components/ui/slider/SliderContainer';
import { getContentImg } from 'utils/CommonFunction';
import { useMediaStore } from 'stores/mediaStore';
import { CoverContent } from 'components/contents/media/CoverContent';
import { MainCoverImg } from 'styles/MainContentStyle';
import { MainContent } from 'components/contents/media/MainContent';
import { Container } from 'styles/MainContentStyle';
import { YouTubePlayer } from 'components/contents/YouTubePlayer';

const mType = 'tv'
function Home () {

    const {playerState, openDetailModal, setOpenContentId, setMediaType} = useMediaStore()
    
    const {data: netflixTvData, isLoading: netflixTvLoading, error: netflixTvError} = useQuery({ queryKey: ['netflix', 'tv'], queryFn: fetchNetflixOriginal })
    const {data: netflixMovieData, isLoading: netflixMovieLoading, error: netflixMovieError} = useQuery({ queryKey: ['netflix', 'movie'], queryFn: fetchNetflixOriginal })

    const [coverData, setCoverData] = useState(null)
    useEffect(() => {
        if (!netflixTvLoading && netflixTvData) {
            const random = 0 // Math.floor(Math.random() * 5)
            const coverData = {
                id: netflixTvData[random].id,
                title: netflixTvData[random].name,
                img: getContentImg(netflixTvData[random].backdrop_path),
                overview: netflixTvData[random].overview.length > 130 ? netflixTvData[random].overview.slice(0, 130) + '...' : netflixTvData[0].overview
            }
            setOpenContentId(netflixTvData[random].id)
            setMediaType(mType)
            setCoverData(coverData)
        }
    }, [netflixTvLoading, netflixTvData])

    const [videokey, setVideokey] = useState()
    const recieveVediokey = useCallback((key) => {
        setTimeout(() => {
            setVideokey(key)
        }, 3000)
    }, [])

    if (netflixMovieLoading || netflixTvLoading) return null
    if (netflixMovieError || netflixTvError) return <p>Error occurred!</p>
    if (!coverData) return null

    return (
        <div>
            {coverData && <div>
                <MainCoverImg id="cover-image" $url={coverData.img}>
                    {videokey && !openDetailModal && <div style={{opacity: playerState.id === videokey && playerState.state === 1 ? 1 : 0}}><YouTubePlayer videoId={videokey} width='100%' height='800px' /></div>}
                </MainCoverImg>
                <Container id="cover-content">                
                    {coverData && <CoverContent mType={mType} coverData={coverData} sendVideokey={recieveVediokey}/>}
                </Container>
            </div>}

            {/* <MainCover /> */}
            <div style={{paddingTop: '650px'}}>
                <div>
                    {netflixTvData && <SliderContainer mType='tv' headerTitle='넷플릭스 오리지널 시리즈' data={netflixTvData} /> }
                </div>
                <div>
                    {netflixMovieData && <SliderContainer mType='movie' headerTitle='넷플릭스 오리지널 영화' data={netflixMovieData} /> }
                </div>
            </div>
        </div>
    )
}

// const MainCover = styled.div`
//     background-image: url(https://assets.nflxext.com/ffe/siteui/vlv3/dadb130d-463b-4e5b-b335-038ed912059e/web_tall_panel/KR-ko-20241118-TRIFECTA-perspective_39e1ee1c-668b-451c-ac1b-2f61698a6a44_large.jpg);
//     height: 800px;
//     margin-bottom: 0px;
//     mask-image: linear-gradient(180deg, #181818, transparent 90%); // linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.4));
//     // mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%);
//     mask-size: 100% 120%;
//     mask-repeat: no-repeat;
//     // mask-position: center bottom;
//     // -webkit-mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%);
//     // -webkit-mask-size: 100% 120%;
//     // -webkit-mask-position: center bottom;

//     position: absolute;
//     z-index: 0;
//     width: 100%;
// `

export default Home