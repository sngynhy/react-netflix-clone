import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchNetflixOriginal } from 'api/movieApi';
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from 'components/ui/slider/SliderSettings';
import { BackdropImage } from 'components/contents/BackdropImage';
import { useMediaStore } from 'stores/mediaStore';

function Home () {

    const {setMediaType, setOpenContentId, setOpenDetailModal} = useMediaStore()
    
    const {data: netflixMovieData, isLoading: netflixMovieLoading, error: netflixMovieError} = useQuery({ queryKey: ['netflix', 'movie'], queryFn: fetchNetflixOriginal })
    const {data: netflixTvData, isLoading: netflixTvLoading, error: netflixTvError} = useQuery({ queryKey: ['netflix', 'tv'], queryFn: fetchNetflixOriginal })

    if (netflixMovieLoading || netflixTvLoading) return null
    if (netflixMovieError || netflixTvError) return <p>Error occurred!</p>

    const openModal = (id, mType) => {
        // console.log('openModal', id, mType);
        setOpenContentId(id)
        setMediaType(mType)
        setOpenDetailModal(true)
    }

    return (
        <div>
            <MainCover/>
            
            <div style={{paddingTop: '650px'}}>
                <div className="slider-container" style={{margin: '3vw 0', width: '100%'}}>
                    <div style={{padding: "0 60px", position: "relative"}}>
                        <h2>넷플릭스 오리지널 시리즈</h2>
                        <Slider {...settings}>
                            {netflixTvData.map((el, i) => (
                                <div className={i+el.id} key={el.id} style={{cursor: 'pointer'}}>
                                    <SlickSlide className='slick-slide' onClick={() => openModal(el.id, 'tv')}>
                                        <BackdropImage
                                            id={el.id}
                                            mType='tv'
                                            title={el.title || el.name}
                                            showTitle={true}
                                            imgPath={el.backdrop_path}
                                            width='120px'
                                            height='40px'
                                        />
                                    </SlickSlide>
                                </div>
                            ))}
                        </Slider>
                    </div>

                    <div style={{padding: "0 60px", position: "relative"}}>
                        <h2>넷플릭스 오리지널 영화</h2>
                        <Slider {...settings}>
                            {netflixMovieData.map((el, i) => (
                                <div className={i+el.id} key={el.id} style={{cursor: 'pointer'}}>
                                    <SlickSlide className='slick-slide' onClick={() => openModal(el.id, 'movie')}>
                                        <BackdropImage
                                            id={el.id}
                                            mType='movie'
                                            title={el.title || el.name}
                                            showTitle={true}
                                            imgPath={el.backdrop_path}
                                            width='120px'
                                            height='40px'
                                        />
                                    </SlickSlide>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    )
}

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
const SlickSlide = styled.div`
    margin: 15px 5px;
    position: sticky;

    &:hover {
        transition: 0.5s;
        transform: scale(1.2);
        z-index: 999;
    }
`
export default Home