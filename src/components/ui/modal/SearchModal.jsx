import React, { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { IoCloseOutline } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { useConetentsByGenreQuery, useConetentsByPersonQuery } from "hooks/useReactQuery";
import GridContents from "components/ui/layout/GridContents";
import { useMediaStore } from "stores/mediaStore";
import { Helmet } from "react-helmet";

export const SearchModal = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const id = searchParams.get('id'), condition = location.state.condition
    const searchModalRef = useRef(null)

    useEffect(() => {
            window.scrollTo(0, 0)
    }, [])
    
    useEffect(() => {
        if (!searchModalRef.current) return

        // 특정 영역 외 클릭 시 이벤트 발생
        const outSideClick = (e) => {
            if (searchModalRef.current && !searchModalRef.current.contains(e.target)) {
                navigate(location.state.background || -1)
            }
        }
        // esc 키 입력 시 이벤트 발생
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                navigate(location.state.background || -1)
            }
        }
        // 이벤트 리스너에 함수 등록
        document.addEventListener("mousedown", outSideClick)
        document.addEventListener("keydown", handleKeyDown)
        return () => {
            document.removeEventListener("mousedown", outSideClick)
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [searchModalRef, navigate, location])

    const goBack = () => navigate(-1) // 이전 위치로 돌아가기
    const closeModal = () => { // 모달 닫기
        const background = location.state?.background || -1
        navigate(background)
    }
    return (
        <div id="search-modal" style={{width: '100%'}}>
            <Helmet>
                <title>넷플릭스</title>
            </Helmet>

            <Wrapper>
                <div ref={searchModalRef} style={{background: 'rgb(24, 24, 24)', padding: '20px', borderRadius: '8px'}}>
                    <TopButton>
                        <span style={{float: 'left'}} onClick={goBack}><GoArrowLeft /></span>
                        <span style={{float: 'right'}} onClick={closeModal}><IoCloseOutline /></span>
                    </TopButton>
                    <Title>
                        <h1>{location.state.title}</h1>
                    </Title>
                    <div style={{padding: '0 60px', marginTop: '60px'}}>
                        {condition === 'person' ? <ContentsByPerson id={id} /> : <ContentsByGenre id={id} mType={location.state.mType} />}
                    </div>
                </div>
            </Wrapper>
        </div>
    )
}

const ContentsByPerson = ({id}) => {
    const {data: movieData, isLoading: isMovieLoading, error: MovieError} = useConetentsByPersonQuery({ type: 'movie', personId: id })
    const {data: tvData, isLoading: isTvLoading, error: TvError} = useConetentsByPersonQuery({ type: 'tv', personId: id })

    if (isMovieLoading || isTvLoading || MovieError || TvError) return <></>

    return (
        <div style={{color: 'white'}}>
            {movieData?.length > 0 &&
            <div style={{marginTop: '40px'}}>
                <h1 style={{fontWeight: 300}}>영화</h1>
                <GridContents data={movieData} mType='movie' showTitle={true} showOverview={false} gridColumns={5} />
            </div>
            }
            {tvData?.length > 0 &&
            <div style={{marginTop: '40px'}}>
                <h1 style={{fontWeight: 300}}>시리즈</h1>
                <GridContents data={tvData} mType='tv' showTitle={true} showOverview={false} gridColumns={5} />
            </div>
            }
        </div>
    )
}

const ContentsByGenre = ({id, mType}) => {
    const { mediaTypes } = useMediaStore()
    const {data, isLoading, error} = useConetentsByGenreQuery({ type: mType, genreId: id })
    if (isLoading || error) return <></>
    return (
        <div>
            <div style={{color: 'white'}}>
                {data?.length > 0 &&
                    <div style={{marginTop: '40px'}}>
                        <h1 style={{fontWeight: 300}}>{mediaTypes[mType]}</h1>
                        <GridContents data={data} mType={mType} showTitle={true} showOverview={false} gridColumns={5} />
                    </div>
                }
            </div>
        </div>
    )
}
export const Wrapper = styled.div`
    border: none;
    border-radius: 8px;
    position: absolute;
    z-index: 1000;
    top: 0;
    padding: 30px 10% 0;
    background-color: rgba(0, 0, 0, 0.7);
    width: 80%;
    min-width: 30%;
    min-height: calc(100vh - 70px);
`
const TopButton = styled.div`
    width: 100%;
    height: 30px;

    & > span {
        cursor: pointer;
    }
    & > span > svg {
        width: 30px;
        height: 30px;
        color: white;
    }
`
const Title = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;
    color: white;

    & > h1 {
        font-size: 50px;
    }
`