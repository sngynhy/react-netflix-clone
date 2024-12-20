import React, { useEffect, useContext, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchNetflixOriginal } from 'api/movieApi';
import styled from "styled-components";
import useLoading from 'hooks/useLoading';
import { SliderContainer } from 'components/ui/SliderContainer';

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
`

function Home () {
    const {data: netflixData, isLoading: netflixLoading, error: netflixError} = useQuery({ queryKey: ['netflix'], queryFn: fetchNetflixOriginal })
    
    return (
        <div>
            <MainCover/>
            
            <Container>
                {netflixData &&
                <div>
                    {/* <SliderContainer mType="netflix" headerTitle="Netflix Original" data={netflixData} /> */}
                </div>}
            </Container>
        </div>
    )
}

export default Home