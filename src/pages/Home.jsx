import React, { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { Helmet } from "react-helmet";
import { fetchNetflixOriginal } from 'api/movieApi';
import { SliderContainer } from 'components/ui/slider/SliderContainer';
import { getContentImg } from 'utils/CommonFunction';
import { useMediaStore } from 'stores/mediaStore';
import { CoverContent } from 'components/contents/media/CoverContent';
import { MainCoverImg } from 'styles/MainContentStyle';
import { Wrapper } from 'styles/MainContentStyle';
import { YouTubePlayer } from 'components/contents/YouTubePlayer';

const mType = 'tv'

function Home () {
    const {playerState, openModal} = useMediaStore()
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
            <Helmet>
                <title>홈 - 넷플릭스</title>
            </Helmet>

            {coverData && <div>
                <MainCoverImg id="cover-image" $url={coverData.img} $maskeffect={playerState.state !== 1}>
                    {videokey && !openModal && <div style={{opacity: playerState.id === videokey && playerState.state === 1 ? 1 : 0}}><YouTubePlayer videoId={videokey} width='100%' height='952px' /></div>}
                </MainCoverImg>
                <Wrapper id="cover-content">                
                    {coverData && <CoverContent mType={mType} coverData={coverData} sendVideokey={recieveVediokey}/>}
                </Wrapper>
            </div>}

            <div style={{paddingTop: 'calc(100vh - 150px)'}}>
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

export default Home