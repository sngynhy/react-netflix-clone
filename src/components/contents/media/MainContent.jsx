import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { FiInfo } from "react-icons/fi";
import { MainCover, CoverContent, SelectBoxForGenre, CoverContentText } from 'styles/MediaStyle';
import { fetchGenres } from 'api/movieApi';
import { useMediaStore } from 'stores/CommonStore';
import styled from 'styled-components';
import PlayButton from 'components/ui/PlayButton';

function MainContent (props) {
    const {mType, genreId, name, coverContent} = props
    const {setGenreName, setOpenDetailModal} = useMediaStore()

    const {data: genres} = useQuery({
        queryKey: ['genres', mType],
        queryFn: fetchGenres,
        staleTime: Infinity, // 데이터는 무기한 신선한 상태로 유지
        cacheTime: Infinity, // 캐시 데이터를 무기한 보관
    })
    const [openGenreBox, setOpenGenreBox] = useState(false)
    const [genre, setGenre] = useState({id: -1, name: '장르'})
    useEffect(() => {
        if (genreId && genres) {
            const gr = genres.find(el => el.id === parseInt(genreId)).name
            setGenre({id: genreId, name: gr})
        }
    }, [mType, genreId, genres])

    const genreBoxRef = useRef(null)
    useEffect(() => {
        // 특정 영역 외 클릭 시 이벤트 발생
    	const outSideClick = (e) => {
            if (genreBoxRef.current && !genreBoxRef.current.contains(e.target)) {
                setOpenGenreBox(false)
            }
        }
        // 이벤트 리스너에 outSideClick 함수 등록
        document.addEventListener("mousedown", outSideClick);
        return () => { document.removeEventListener("mousedown", outSideClick); }
    }, [genreBoxRef])
    
    const navigate = useNavigate()
    useEffect(() => {
        if (genre.id > -1) {
            setGenreName(genre.name)
            setOpenGenreBox(false)
            navigate(`/media/${mType}/genre/${genre.id}`)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [genre])

    return (
        <>
            {coverContent && <div>
            <MainCover url={coverContent.img}/>

            {/* 중앙 콘텐츠 */}
            <CoverContent id="cover-content">
                {/* 장르 선택 */}
                <SelectBoxForGenre bgcolor={openGenreBox ? 'hsla(0,0%,100%,.1)' : 'black'}>
                    {genre.id === -1 ?
                        <>
                            <span>{name}</span>
                            <div className="selectBox" onClick={() => setOpenGenreBox(true)}>
                                <div className="selectIndex">
                                    <span>{genre.name}</span>
                                    <span style={{float: 'right'}}>▼</span>
                                </div>
                                <div className="selectBoxOptions" ref={genreBoxRef}>
                                    {openGenreBox && genreBoxRef && genres.map((el, i) => <div key={i} onClick={() => setGenre({id: el.id, name: el.name})} style={{padding: '5px'}}><span>{el.name}</span></div>)}
                                </div>
                            </div>
                        </>
                    : <>
                        <div style={{fontSize: '18px', color: 'grey'}}>
                            <span onClick={() => {setGenre({id: -1, name: '장르'}); navigate(`/media/${mType}`);}} style={{cursor: 'pointer'}}>{name}</span>
                            <span style={{margin: '0 8px'}}>></span>
                        </div>
                        <span>{genre.name}</span>
                    </>
                    }
                </SelectBoxForGenre>
                {/* 메인 커버 콘텐츠 */}
                <CoverContentText>
                    <h2>{coverContent.title}</h2>
                    <p>{coverContent.overview}</p>
                    <div style={{marginTop: '30px'}}>
                        {/* <PlayButton /> */}
                        <button className="btn detailBtn" onClick={() => setOpenDetailModal(true)}><FiInfo />상세정보</button>
                    </div>
                </CoverContentText>
            </CoverContent>
            </div>}
        </>
    )
}

export default MainContent