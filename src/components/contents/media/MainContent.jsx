import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MainCoverImg, Wrapper } from 'styles/MainContentStyle';
import { useMediaStore } from 'stores/mediaStore';
import { YouTubePlayer } from '../YouTubePlayer';
import { SelectBoxForGenre } from './SelectBoxForGenre';
import { CoverContent } from './CoverContent';

export const MainContent = React.memo(({mType, coverData, genreId=null}) => {
    // console.log('MainContent', mType, genreId, name, coverData);
    const { playerState, openModal } = useMediaStore()
    const [videokey, setVideokey] = useState()
    const [first, setFirst] = useState(true)
    
    useEffect(() => {
        setVideokey()
        setFirst(true)
    }, [mType, genreId])

    useEffect(() => {
        if (playerState.state === 1) setFirst(false)
        else if (!first && playerState.state === -1 && !openModal && videokey) {
            document.getElementById('video-stop-btn-' + videokey).click()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openModal, videokey, playerState])

    const recieveVediokey = (key) => setVideokey(key)

    // console.log('🎁 MainContent 🎁', videokey);
    return (
        <>
            <MainCoverImg id="cover-image" $url={coverData.img} $maskeffect={playerState.state !== 1}>
                {videokey && !openModal && <div style={{opacity: playerState.id === videokey && playerState.state === 1 ? 1 : 0}}><YouTubePlayer videoId={videokey} width='100%' height='952px' /></div>}
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