import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { FiInfo } from "react-icons/fi";
import { MainCoverImg, Container, SelectBox, CoverContentText } from 'styles/MainContentStyle';
import { fetchGenres } from 'api/movieApi';
import { useMediaStore } from 'stores/mediaStore';
import { useGlobalStore } from 'stores/globalStore';
import { PlayButton } from 'components/ui/PlayButton';
import { LogoImage } from '../LogoImage';
import { useVideoQuery } from 'hooks/useReactQuery';
import { YouTubePlayer } from '../YouTubePlayer';

export const MainContent = React.memo(({mType, genreId, name, coverData}) => {
    // console.log('MainContent', mType, genreId, name, coverData);
    return (
        <>
            <MainCoverImg id="cover-image" $url={coverData.img}/>
            
            {/* 중앙 콘텐츠 */}
            <Container id="cover-content">
                {/* 장르 선택 박스 */}
                <SelectBoxForGenre mType={mType} genreId={genreId} name={name} />
                
                {/* 메인 커버 콘텐츠 */}
                {coverData && <CoverContent mType={mType} coverData={coverData} />}
            </Container>
        </>
    )
})

const SelectBoxForGenre = ({mType, genreId, name}) => {

    const [openGenreBox, setOpenGenreBox] = useState(false)
    const [genre, setGenre] = useState({id: -1, name: '장르'})
    
    const { setGenreName, openDetailModal } = useMediaStore()
    const { scrollTop } = useGlobalStore()

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
        <SelectBox $openGenreBox={openGenreBox} $scrollTop={scrollTop} $openDetailModal={openDetailModal}>
            {genreId ?
                <>
                    <div style={{fontSize: '18px', color: 'grey'}}>
                        <span onClick={() => navigate(`/media/${mType}`)} style={{cursor: 'pointer'}}>{name}</span>
                        <span style={{margin: '0 8px'}}>></span>
                    </div>
                    <span>{genre.name}</span>
                </>
                : <>
                    <span>{name}</span>
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

const CoverContent = ({mType, coverData}) => {
    const { setOpenContentId, setOpenDetailModal } = useMediaStore()
    
    // video
    // const {data: videokey, isLoading: videoLoading} = useVideoQuery({type: mType, id: coverData.id})
    // console.log('videokey', videokey);

    // if (!coverData || videoLoading) return

    const openModal = () => {
        setOpenContentId(coverData.id)
        setOpenDetailModal(true)
    }
    return (
        <CoverContentText>
            {coverData && <h2 style={{width: '60%'}}><LogoImage id={coverData.id} mType={mType} alt={coverData.title} /></h2>}
            <p>{coverData.overview}</p>
            <div style={{marginTop: '30px'}}>
                <div style={{position: 'relative', display: 'flex'}}>
                    {/* <PlayButton active={!!videokey} />
                    {videokey && <div style={{position: 'absolute', top: 0, zIndex: -1, opacity: 0}}><YouTubePlayer videoId={videokey} width='119px' height='45px' /></div>} */}
                    <button className="btn detailBtn" onClick={openModal}><FiInfo />상세정보</button>
                </div>
            </div>
        </CoverContentText>
    )
}