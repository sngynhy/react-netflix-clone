import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import DetailModal from 'components/modal/DetailModal';
import styled from 'styled-components';
import { getContentImg } from 'utils/CommonFunction';
import { useMediaStore } from 'stores/CommonStore';
import MainContent from 'components/contents/media/MainContent';
import { GenreConetns } from 'components/contents/media/slidersection/GenreConstens';
import { MovieContents } from 'components/contents/media/slidersection/MovieConetns';

const Wrapper = styled.div`
    opacity: ${props => props.opacity}
`
const mediaTypes = {
    movie: {name: '영화', title: ['Now Playing In Theaters', 'Popular', 'Top Rated', 'Upcoming'] },
    tv: { name: '시리즈', title: ['On The Air', 'Popular', 'Top Rated', 'Airing Today'] }
}

function Media () {
    let { mType, genreId } = useParams()
    const { openDetailModal, setOpenDetailModal } = useMediaStore()
    
    const detailModalRef = useRef(null)
    useEffect(() => {
        // 특정 영역 외 클릭 시 이벤트 발생
    	const outSideClick = (e) => {
            if (detailModalRef.current && !detailModalRef.current.contains(e.target)) {
                setOpenDetailModal(false)
            }
        }
        // 이벤트 리스너에 outSideClick 함수 등록
        document.addEventListener("mousedown", outSideClick);
        return () => { document.removeEventListener("mousedown", outSideClick); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detailModalRef])

    const [coverContent, setCoverContent] = useState({})
    const recieveDataFromSliderForCoverContent = (data) => {
        let randomIndex = Math.floor(Math.random() * data.length)
        let temp = data[randomIndex]
        let coverData = {
            id: temp.id,
            title: temp.title || temp.name,
            img: getContentImg(temp.backdrop_path),
            overview: temp.overview.length > 130 ? temp.overview.slice(0, 130) + '...' : temp.overview
        }
        setCoverContent(coverData)
    }

    return (
        <div>
            {/* {openDetailModal && genreBoxRef && <div ref={detailModalRef}><DetailModal id={coverContents.id} type={type} /></div>} */}
            {openDetailModal && <div id="detail-modal" ref={detailModalRef}><DetailModal id={coverContent.id} mType={mType} /></div>}
            
            <Wrapper opacity={openDetailModal ? 0.7 : 1}>
                {/** 중앙 메인 콘텐츠 */}
                <MainContent mType={mType} name={mediaTypes[mType].name} genreId={genreId} coverContent={coverContent} />

                {/** 하단 슬라이더 */}
                {genreId ? <GenreConetns mType={mType} genreId={genreId} sendDataToParent={recieveDataFromSliderForCoverContent} />
                : <MovieContents mType={mType} mediaTypes={mediaTypes} sendDataToParent={recieveDataFromSliderForCoverContent} />}
            </Wrapper>
        </div>
    )
}

export default Media