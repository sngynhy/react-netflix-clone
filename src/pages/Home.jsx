import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { useQuery } from '@tanstack/react-query';
import { fetchContentDetails, fetchNetflixOriginal } from 'api/movieApi';
import LoadingOverlay from 'components/ui/LoadingOverlay';
import Slider from 'components/ui/Slider';

const Wrapper = styled.div`
`

const MainCover = styled.div`
    background-image: url(https://assets.nflxext.com/ffe/siteui/vlv3/dadb130d-463b-4e5b-b335-038ed912059e/web_tall_panel/KR-ko-20241118-TRIFECTA-perspective_39e1ee1c-668b-451c-ac1b-2f61698a6a44_large.jpg);
    height: 800px;
    margin-bottom: 0px;
    mask-image: linear-gradient(180deg, #181818, transparent 90%); // linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.4));
    // mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%);
    mask-size: 100% 120%;
    mask-repeat: no-repeat;
    // mask-position: center bottom;
    // -webkit-mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%);
    // -webkit-mask-size: 100% 120%;
    // -webkit-mask-position: center bottom;

    position: absolute;
    z-index: 0;
    width: 100%;
`

const Container = styled.div`
    padding-top: 650px;
    // position: absolute;
    // z-index: 1;
`

function Home () {
    const {data: netflix, isLoading: netflixLoading, error: netflixError} = useQuery({ queryKey: ['netflix'], queryFn: fetchNetflixOriginal })

    if (netflixLoading) return <LoadingOverlay />;
    if (netflixError) return <p>Error occurred! {netflixError.message}</p>;

    return (
        <Wrapper>
            <MainCover/>

            <Container>
                <div>
                    {/* <Slider name="현재 상영작" data={nowPlaying} /> */}
                </div>
  
                <div>
                    {/* <Slider data={netflix.slice(0, 10)} /> */}
                    {/* <Slider name="Netflix Original" data={netflix} /> */}
                </div>

                <div>
                    {/* <Slider name="인기있는" data={popluar} /> */}
                </div>
            </Container>
        </Wrapper>
    )
}

export default Home