import React, { useEffect, useRef } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { IoCloseOutline } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { useConetentsByGenreQuery, useConetentsByPersonQuery } from "hooks/useReactQuery";
import GridContents from "components/contents/GridContents";
import { useMediaStore } from "stores/mediaStore";

export const SearchModal = React.memo(() => {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const id = searchParams.get('id'), condition = location.state.condition
    console.log('📋 SearchModal > location', location);

    const {setOpenModal} = useMediaStore()
    const searchModalRef = useRef(null)
    useEffect(() => {
        setOpenModal(true)

        // 특정 영역 외 클릭 시 이벤트 발생
        const outSideClick = (e) => {
            if (searchModalRef.current && !searchModalRef.current.contains(e.target)) {
                navigate(-1)
            }
        }
        // 이벤트 리스너에 outSideClick 함수 등록
        document.addEventListener("mousedown", outSideClick)
        return () => {
            document.removeEventListener("mousedown", outSideClick)
            setOpenModal(false)
        }
    }, [searchModalRef, setOpenModal, navigate])

    
    const goBack = () => navigate(-1) // 이전 위치로 돌아가기
    // const closeModal = () => navigate(location.state.background.pathname + location.state.background.search) // 모달 닫기
    const closeModal = () => { // 모달 닫기
        const background = location.state?.background || -1
        console.log('background', background);
        navigate(background)
        // navigate(location.state.background.pathname + location.state.background.search)
    }

    return (
        <Container id="search-modal">
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
})

export const ContentsByPerson = ({id}) => {
    const {data: movieData, isLoading: isMovieLoading, error: MovieError} = useConetentsByPersonQuery({ type: 'movie', personId: id })
    const {data: tvData, isLoading: isTvLoading, error: TvError} = useConetentsByPersonQuery({ type: 'tv', personId: id })
    // console.log('movieData', movieData);
    // console.log('tvData', tvData);
    
    if (isMovieLoading || isTvLoading || MovieError || TvError) return null
    return (
        <div>
                <div style={{color: 'white'}}>
                {movieData?.length > 0 &&
                    <div style={{marginTop: '40px'}}>
                        <h1 style={{fontWeight: 300}}>영화</h1>
                        <GridContents data={movieData} mType='movie' showTitle={true} showPlayButton={false} showOverview={false} gridColumns={5} />
                    </div>
                }
                {tvData?.length > 0 &&
                    <div style={{marginTop: '40px'}}>
                        <h1 style={{fontWeight: 300}}>시리즈</h1>
                        <GridContents data={tvData} mType='tv' showTitle={true} showPlayButton={false} showOverview={false} gridColumns={5} />
                    </div>
                }
                </div>
        </div>
    )
}
export const ContentsByGenre = ({id, mType}) => {
    const { mediaTypes } = useMediaStore()
    const {data, isLoading, error} = useConetentsByGenreQuery({ type: mType, genreId: id })
    if (isLoading || error) return null
    return (
        <div>
            <div style={{color: 'white'}}>
                {data?.length > 0 &&
                    <div style={{marginTop: '40px'}}>
                        <h1 style={{fontWeight: 300}}>{mediaTypes[mType]}</h1>
                        <GridContents data={data} mType={mType} showTitle={true} showPlayButton={false} showOverview={false} gridColumns={5} />
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
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: black;
    overflow: auto;
`