import React, { useState } from 'react'
import styled from "styled-components";
import { useQuery } from '@tanstack/react-query';
import { fetchGenres, fetchNetflixOriginal, fetchNowplaying, fetchPopular, fetchToprated, fetchupcoming } from 'api/movieApi';
import LoadingOverlay from 'components/common/LoadingOverlay';
import SliderContainer from 'components/ui/Slider';

const Wrapper = styled.div`

`

const MainCover = styled.div`
    background-image: url(https://assets.nflxext.com/ffe/siteui/vlv3/dadb130d-463b-4e5b-b335-038ed912059e/web_tall_panel/KR-ko-20241118-TRIFECTA-perspective_39e1ee1c-668b-451c-ac1b-2f61698a6a44_large.jpg);
    height: 800px;
    margin-bottom: 0px;
    mask-image: linear-gradient(180deg, #181818, transparent 90%); // linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.4));
    // mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%);
    mask-size: 100% 120%;
    mask-position: center bottom;
    mask-repeat: no-repeat;
    // -webkit-mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%);
    // -webkit-mask-size: 100% 120%;
    // -webkit-mask-position: center bottom;

    position: absolute;
    z-index: 0;
    width: 100%;
`

const Container = styled.div`
    padding-top: 600px;
    // position: absolute;
    // z-index: 1;
`

function Main () {
    const name = '영화'
    const [openCategory, setOpenCategory] = useState(false)
    const [selectedCategory, setCategory] = useState('장르')

    const {data: genres} = useQuery({ queryKey: ['genres'], queryFn: fetchGenres })
    const {data: nowPlaying, isLoading: nowPlayingLoading, error: nowPlayingError} = useQuery({ queryKey: ['nowPlaying'], queryFn: fetchNowplaying })
    const {data: popluar, isLoading: popluarLoading, error: popluarError} = useQuery({ queryKey: ['popluar'], queryFn: fetchPopular })
    const {data: topRated, isLoading: topRatedLoading, error: topRatedError} = useQuery({ queryKey: ['topRated'], queryFn: fetchToprated })
    const {data: netflix, isLoading: netflixLoading, error: netflixError} = useQuery({ queryKey: ['netflix'], queryFn: fetchNetflixOriginal })

    if (nowPlayingLoading || popluarLoading || topRatedLoading || netflixLoading) return <LoadingOverlay />;
    if (nowPlayingError || popluarError || topRatedError || netflixError) return <p>Error occurred!</p>;


    return (
        <Wrapper>
            <MainCover id="main-cover"/>
            <div style={{position:'absolute', zIndex: 1, margin: '20px 0', padding: '0 60px'}}>
                <div style={{alignItems: 'center', display: 'flex', flexDirection: 'row', flexGrow: 1, justifyContent: 'flex-start'}}>
                    <span style={{fontSize: '38px', marginRight: '15px'}}>{name}</span>
                    <div style={{border: '1px solid white', width: '95px', margin: '0 30px', cursor: 'pointer', display: 'inline-block', position: 'relative', backgroundColor: 'black'}} onClick={() => setOpenCategory(prev => !prev)}>
                        <div style={{padding: '5px 10px'}}>
                            <span>{selectedCategory}</span>
                            <span style={{float: 'right'}}>▼</span>
                        </div>
                        <div style={{position: 'absolute', zIndex: 3, top: '32px', backgroundColor: 'black', width: '150px'}}>
                            {openCategory && genres.map(el => <div onClick={() => setCategory(el.name)} style={{padding: '5px'}}><span style={{borderBottom: '1px solid white'}}>{el.name}</span></div>)}
                        </div>
                    </div>
                </div>
            </div>

            <Container>
                {/* <div>
                    <Slider name="현재 상영작" data={nowPlaying} />
                </div> */}

                <div>
                    {/* <h1>Netflix Original</h1> */}
                    {/* <Slider data={netflix.slice(0, 10)} /> */}
                    <SliderContainer headerTitle="Netflix Original" data={netflix} />
                </div>

                <div>
                    {/* <h1>인기있는</h1> */}
                    <SliderContainer headerTitle="인기있는" data={popluar.slice(0, 10)} />
                </div>
            </Container>
        </Wrapper>
    )
}

export default Main