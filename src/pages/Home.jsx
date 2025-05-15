import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { Helmet } from "react-helmet";
import { fetchNetflixOriginal } from 'api/mediaApi';
import { SliderContainer } from 'components/ui/slider/SliderContainer';
import { getContentImg } from 'utils/CommonFunction';
import { useMediaStore } from 'stores/mediaStore';
import { CoverContent } from 'components/contents/media/CoverContent';
import { MainCoverImg } from 'styles/MainContentStyle';
import { Wrapper } from 'styles/MainContentStyle';
import { YouTubePlayer } from 'components/contents/YouTubePlayer';
import { Container } from "styles/Commonstyle";
import { useResponsive } from "hooks/useResponsive";
import { videoHeight } from "utils/mediaSize";

const mType = 'tv'

function Home () {
    const {playerState, isModalOpen} = useMediaStore()
    const [coverData, setCoverData] = useState()
    const [videokey, setVideokey] = useState()
    const [first, setFirst] = useState(true)

    const { device } = useResponsive()

    const {data: netflixTvData, isLoading: netflixTvLoading, error: netflixTvError} = useQuery({ queryKey: ['netflix', 'tv'], queryFn: fetchNetflixOriginal })
    const {data: netflixMovieData, isLoading: netflixMovieLoading, error: netflixMovieError} = useQuery({ queryKey: ['netflix', 'movie'], queryFn: fetchNetflixOriginal })

    useEffect(() => {
        if (!netflixTvLoading && netflixTvData) {
            const random = 0 // Math.floor(Math.random() * 5)
            const coverData = {
                id: netflixTvData[random].id,
                title: netflixTvData[random].name,
                img: getContentImg(netflixTvData[random].backdrop_path),
                overview: netflixTvData[random].overview.length > 130 ? netflixTvData[random].overview.slice(0, 130) + '...' : netflixTvData[0].overview
            }
            setCoverData(coverData)
        }
    }, [netflixTvLoading, netflixTvData])

    const recieveVediokey = (key) => setVideokey(key)
    useEffect(() => {
        // console.log('넹', first, playerState);
        if (playerState.state === 1) setFirst(false)
        else if (!first && playerState.state === -1 && !isModalOpen && videokey) {
            document.getElementById('video-stop-btn-' + videokey).click()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isModalOpen, videokey, playerState])

    if (netflixMovieLoading || netflixTvLoading || netflixMovieError || netflixTvError || !coverData) return <></>
    
    return (
        <div>
            <Helmet>
                <title>홈 - 넷플릭스</title>
            </Helmet>

            {coverData && <div>
                <MainCoverImg id="cover-image" $url={coverData.img} $maskeffect={playerState.state !== 1}>
                    {videokey && !isModalOpen && <div style={{opacity: playerState.id === videokey && playerState.state === 1 ? 1 : 0}}><YouTubePlayer videoId={videokey} height={videoHeight[device]} /></div>}
                </MainCoverImg>
                <Wrapper id="cover-content">                
                    {coverData && <CoverContent mType={mType} coverData={coverData} sendVideokey={recieveVediokey}/>}
                </Wrapper>
            </div>}

            <Container>
                {netflixTvData && <SliderContainer mType='tv' headerTitle='넷플릭스 오리지널 시리즈' data={netflixTvData} /> }
                {netflixMovieData && <SliderContainer mType='movie' headerTitle='넷플릭스 오리지널 영화' data={netflixMovieData} /> }
            </Container>
        </div>
    )
}

export default Home