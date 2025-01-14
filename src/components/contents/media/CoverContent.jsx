import { useVideoQuery } from "hooks/useReactQuery"
import React, { useEffect, useState } from "react"
import { useMediaStore } from "stores/mediaStore"
import { CoverContentText, DetailViewButton, Overview } from 'styles/MainContentStyle';
import { PlayButton } from 'components/ui/button/PlayButton';
import { LogoImage } from '../LogoImage';
import { ReplayButton } from "components/ui/button/ReplayButton";
import { MuteButton } from "components/ui/button/MuteButton";
import { FiInfo } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

export const CoverContent = ({mType, coverData, sendVideokey}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const { playerState, playable, openModal } = useMediaStore()
    const [lowerTitle, setLowerTitle] = useState(false)

    useEffect(() => {
        setLowerTitle(false)
    }, [mType, coverData])

    // video
    const {data: videokey, isLoading: videoLoading} = useVideoQuery({type: mType, id: coverData.id})
    useEffect(() => { 
        sendVideokey(videokey)
    }, [videokey, sendVideokey])
    
    useEffect(() => {
        if (playerState.id === videokey && playerState.state === 1) {
            setTimeout(() => {
                if (!openModal) setLowerTitle(true)
            }, 3000)
        }
        else setTimeout(() => setLowerTitle(false), 1000)
    }, [openModal, playerState, videokey])
    
    if (!coverData || videoLoading) return
    
    const openDetailModal = () => {
        if (videokey && playerState.id === videokey && playerState.state === 1) {
            document.getElementById('video-puause-btn').click()
        }
        navigate(`/detail?id=${encodeURIComponent(coverData.id)}`, {state: { background: location, mType: mType }})
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
                    <div style={{marginRight: '12px'}}><PlayButton active={videokey && playable} /></div>
                    <div style={{marginRight: '12px'}}><DetailViewButton className="detailBtn" onClick={openDetailModal}><FiInfo />상세정보</DetailViewButton></div>
                    {videokey && videokey === playerState.id && playable &&
                    <div style={{marginRight: '12px'}}>
                        {playerState.state === 0 ? <ReplayButton /> : <MuteButton />}
                    </div>}
                </div>
            </div>
        </CoverContentText>
    )
}