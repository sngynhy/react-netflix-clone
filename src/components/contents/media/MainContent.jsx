import React, { useCallback, useEffect, useState } from 'react'
import { MainCoverImg, Wrapper } from 'styles/MainContentStyle';
import { useMediaStore } from 'stores/mediaStore';
import { YouTubePlayer } from '../YouTubePlayer';
import { SelectBoxForGenre } from './SelectBoxForGenre';
import { CoverContent } from './CoverContent';

export const MainContent = React.memo(({mType, coverData, genreId=null}) => {
    // console.log('MainContent', mType, genreId, name, coverData);
    const { playerState, openModal } = useMediaStore()
    const [videokey, setVideokey] = useState()

    useEffect(() => {
        return () => setVideokey(null)
    }, [mType, genreId])
    
    useEffect(() => {
        if (!openModal && videokey && playerState.state === -1) {
            // document.getElementById('video-stop-btn').click()
        }
    }, [openModal, videokey, playerState])

    const recieveVediokey = useCallback((data) => {
        setTimeout(() => {
            setVideokey(data)
        }, 3000)
    }, [])
    // console.log('🎁 MainContent 🎁', playerState);
    return (
        <>
            <MainCoverImg id="cover-image" $url={coverData.img}>
                {videokey && !openModal && <div style={{opacity: playerState.id === videokey && playerState.state === 1 ? 1 : 0}}><YouTubePlayer videoId={videokey} width='100%' height='1000px' /></div>}
                {/* {videokey && <div style={{opacity: playerState.id === videokey && playerState.state === 1 ? 1 : 0}}><YouTubePlayer videoId={videokey} width='100%' height='1000px' /></div>} */}
            </MainCoverImg>
            
            {/* 중앙 콘텐츠 */}
            <Wrapper id="cover-content">
                {/* 장르 선택 박스 */}
                <SelectBoxForGenre mType={mType} genreId={genreId} />
                
                {/* 메인 커버 콘텐츠 */}
                {coverData && <CoverContent mType={mType} coverData={coverData} sendVideokey={recieveVediokey} />}
            </Wrapper>
        </>
    )
})