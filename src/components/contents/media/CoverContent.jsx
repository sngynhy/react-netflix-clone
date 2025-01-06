import { useVideoQuery } from "hooks/useReactQuery"
import React, { useEffect, useState } from "react"
import { useMediaStore } from "stores/mediaStore"
import { CoverContentText, DetailViewButton, Overview } from 'styles/MainContentStyle';
import { PlayButton } from 'components/ui/button/PlayButton';
import { LogoImage } from '../LogoImage';
import { ReplayButton } from "components/ui/button/ReplayButton";
import { MuteButton } from "components/ui/button/MuteButton";
import { FiInfo } from "react-icons/fi";

export const CoverContent = ({mType, coverData, sendVideokey}) => {
    const { playerState, playable, setOpenContentId, setOpenDetailModal } = useMediaStore()
    const [lowerTitle, setLowerTitle] = useState(false)

    useEffect(() => {
        setLowerTitle(false)
    }, [mType])

    // video
    const {data: videokey, isLoading: videoLoading} = useVideoQuery({type: mType, id: coverData.id})
    useEffect(() => { 
        if (videokey) sendVideokey(videokey)
    }, [videokey, sendVideokey])
    
    useEffect(() => {
        if (playerState.id === videokey && playerState.state === 1) setTimeout(() => setLowerTitle(true), 5000)
        else if (playerState.state === 0 || playerState.err) setTimeout(() => setLowerTitle(false), 1000)
    }, [playerState, videokey])
    
    if (!coverData || videoLoading) return
    
    const openModal = () => {
        setOpenContentId(coverData.id)
        setOpenDetailModal(true)
        if (videokey && playerState.id === videokey && playerState.state === 1) {
            document.getElementById('video-puause-btn').click()
        }
    }
    return (
        <CoverContentText>
            {coverData &&
            // <h2 style={{width: '60%'}}>
            <h2>
                <LogoImage id={coverData.id} mType={mType} alt={coverData.title} lowerTitle={lowerTitle} transform='scale(.7) translate(-108px, 190px);' />
            </h2>}

            <Overview $lowerTitle={lowerTitle}>{coverData.overview}</Overview>
            <div style={{marginTop: '30px'}}>
                <div style={{position: 'relative', display: 'flex'}}>
                    <div style={{marginRight: '12px'}}><PlayButton active={videokey && !playerState.error} /></div>
                    <div style={{marginRight: '12px'}}><DetailViewButton className="detailBtn" onClick={openModal}><FiInfo />상세정보</DetailViewButton></div>
                    {videokey && videokey === playerState.id && playable &&
                    <div style={{marginRight: '12px'}}>
                        {playerState.state === 0 ? <ReplayButton /> : <MuteButton />}
                    </div>}
                </div>
            </div>
        </CoverContentText>
    )
}