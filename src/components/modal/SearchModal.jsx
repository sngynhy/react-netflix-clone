import React, { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { IoCloseOutline } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { useConetentsByGenreQuery, useConetentsByPersonQuery } from "hooks/useReactQuery";
import GridContents from "components/contents/GridContents";
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
    
    const [height, setHeight] = useState('100%')
    useEffect(() => {
        if (!searchModalRef.current) return
        const targetNode = searchModalRef.current

        // ResizeObserver 생성
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                if (entry.target === targetNode) {
                    const newHeight = entry.contentRect.height // 새로운 높이
                    setHeight(newHeight + 30 + 7 + 33 + 'px')
                }
            }
        })

        // 대상 요소 관찰 시작
        resizeObserver.observe(targetNode)

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
            resizeObserver.disconnect()
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
        <Container id="search-modal" $height={height}>
            <Helmet>
                <title>넷플릭스</title>
            </Helmet>

            <div style={{padding: '30px 10% 0', position: 'absolute', top: 0, width: '80%'}}>
                <div ref={searchModalRef} style={{background: 'rgb(24, 24, 24)', padding: '20px', borderRadius: '5px', minHeight: 'calc(100vh - 70px)'}}>
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
            </div>
        </Container>
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
const Container = styled.div`
    position: absolute;
    display: flex;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    width: 100%;
    height: ${props => props.$height};
    background-color: rgba(0, 0, 0, 0.5);
    color: black;
    // overflow: auto;
`