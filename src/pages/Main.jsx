import React from 'react'
import styled from "styled-components";
import { useQuery } from '@tanstack/react-query';
import { fetchNetflixOriginal, fetchNowplaying, fetchPopular, fetchToprated, fetchUpcomming } from '../api/movieApi';
import LoadingOverlay from 'components/ui/LoadingOverlay';
import Slider from 'components/layout/Slider';

const Wapper = styled.div`
    padding: 0 40px;
`
const MainCover = styled.div`
    background-image: url(https://assets.nflxext.com/ffe/siteui/vlv3/dadb130d-463b-4e5b-b335-038ed912059e/web_tall_panel/KR-ko-20241118-TRIFECTA-perspective_39e1ee1c-668b-451c-ac1b-2f61698a6a44_large.jpg);
    height: 600px;
    -webkit-mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%);
    mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%);
    -webkit-mask-size: 100% 120%;
    mask-size: 100% 120%;
    -webkit-mask-position: center bottom;
    mask-position: center bottom;
    mask-repeat: no-repeat;
`

function Main () {

    // const {data, isLoading, error} = useQuery({ queryKey: ['nowPlaying'], queryFn: fetchNowplaying })
    // console.log('useQuery', data)
    const {data: nowPlaying, isLoading: nowPlayingLoading, error: nowPlayingError} = useQuery({ queryKey: ['nowPlaying'], queryFn: fetchNowplaying })
    const {data: popluar, isLoading: popluarLoading, error: popluarError} = useQuery({ queryKey: ['popluar'], queryFn: fetchPopular })
    const {data: topRated, isLoading: topRatedLoading, error: topRatedError} = useQuery({ queryKey: ['topRated'], queryFn: fetchToprated })
    const {data: netflix, isLoading: netflixLoading, error: netflixError} = useQuery({ queryKey: ['netflix'], queryFn: fetchNetflixOriginal })

    if (nowPlayingLoading || popluarLoading || topRatedLoading || netflixLoading) return <LoadingOverlay />;
    if (nowPlayingError || popluarError || topRatedError || netflixError) return <p>Error occurred!</p>;

    return (
        <Wapper>
            <MainCover />

            <div>
                <h1>Netflix Original</h1>
                <Slider data={netflix.slice(0, 10)} />
            </div>

            <div>
                <h1>인기있는</h1>
                <Slider data={popluar.slice(0, 10)} />
            </div>
        </Wapper>
    )
}

export default Main