import React, { useEffect, useRef, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useMediaStore } from "stores/mediaStore"
import { useNavigate } from "react-router-dom"
import { SelectBox } from 'styles/MainContentStyle';
import { fetchGenres } from 'api/mediaApi';

export const SelectBoxForGenre = ({mType, genreId}) => {

    const { mediaTypes, isModalOpen, setGenreName } = useMediaStore()

    const [scrollTop, setScrollTop] = useState(true)
    useEffect(() => {
            const handleScroll = () => setScrollTop(window.scrollY === 0)
    
            window.addEventListener('scroll', handleScroll)
            return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const [genre, setGenre] = useState({id: -1, name: '장르'})
    const {data: genres} = useQuery({
        queryKey: ['genres', mType],
        queryFn: fetchGenres,
        staleTime: Infinity, // 데이터는 무기한 신선한 상태로 유지
        cacheTime: Infinity, // 캐시 데이터를 무기한 보관
    })
    useEffect(() => {
        if (genres) {
            if (genreId) {
                const genreName = genres.find(el => el.id === parseInt(genreId)).name
                setGenre({id: genreId, name: genreName})
            } else {
                setGenre({id: -1, name: '장르'})
            }
        }
    }, [mType, genreId, genres])

    const [openGenreBox, setOpenGenreBox] = useState(false)
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
        <SelectBox $openGenreBox={openGenreBox} $scrollTop={scrollTop} $isModalOpen={isModalOpen}>
            {genreId ?
                <>
                    <div style={{fontSize: '18px', color: 'grey'}}>
                        <span onClick={() => navigate(`/media/${mType}`)} style={{cursor: 'pointer'}}>{mediaTypes[mType]}</span>
                        <span style={{margin: '0 8px'}}>></span>
                    </div>
                    <span>{genre.name}</span>
                </>
                : <>
                    <span>{mediaTypes[mType]}</span>
                    <div className="selectBox" onClick={() => setOpenGenreBox(true)}>
                        <div className="selectIndex">
                            <span style={{paddingRight: "30px"}}>{genre.name}</span>
                            <span style={{float: 'right'}}>▼</span>
                        </div>
                        <div className="selectBoxOptions" ref={genreBoxRef}>
                            {openGenreBox && genreBoxRef && genres.map((el, i) => <div key={i} onClick={() => setGenre({id: el.id, name: el.name})} style={{padding: '5px'}}><span>{el.name}</span></div>)}
                        </div>
                    </div>
                </>
            }
        </SelectBox>
    )
}