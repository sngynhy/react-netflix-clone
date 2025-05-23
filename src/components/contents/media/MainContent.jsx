import React, { useEffect, useState } from 'react'
import { MainCoverImg, Wrapper } from 'styles/MainContentStyle';
import { useMediaStore } from 'stores/mediaStore';
import { YouTubePlayer } from '../YouTubePlayer';
import { SelectBoxForGenre } from './SelectBoxForGenre';
import { CoverContent } from './CoverContent';
import { useResponsive } from "hooks/useResponsive";
import { videoHeight } from "utils/mediaSize";

export const MainContent = React.memo(({mType, coverData, genreId=null}) => {
    // console.log('MainContent', mType, genreId, coverData);

    const { playerState, isModalOpen } = useMediaStore()
    const [videokey, setVideokey] = useState()
    const [initial, setInitial] = useState(true)

    const { device } = useResponsive()
    
    useEffect(() => {
        setVideokey()
        setInitial(true)
    }, [mType, genreId])

    useEffect(() => {
        if (playerState.state === 1) setInitial(false)
        else if (!initial && playerState.state === -1 && !isModalOpen && videokey) {
            document.getElementById('video-stop-btn-' + videokey).click()
        }

        // return () => setInitial(true)
    }, [isModalOpen, videokey, playerState])

    const recieveVediokey = (key) => setVideokey(key)

    // console.log('🎁 MainContent 🎁', videokey);
    return (
        <>
            <MainCoverImg id="cover-image" $url={coverData.img} $maskeffect={playerState.state !== 1}>
                {videokey && !isModalOpen &&
                    <div style={{opacity: playerState.id === videokey && playerState.state === 1 ? 1 : 0}}>
                        <YouTubePlayer videoId={videokey} height={videoHeight[device]} />
                    </div>}
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