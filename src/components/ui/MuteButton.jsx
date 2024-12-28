import React from "react";
import { GoUnmute, GoMute } from "react-icons/go";
import { useMediaStore } from "stores/mediaStore";
import { Border } from "styles/IconButtonStyle";

export const MuteButton = ({borderSize=45, iconSize=25}) => {
    const {isMuted, setIsMuted} = useMediaStore()
    const setMute = () => {
        if (document.getElementById('player')) {
            if (isMuted) document.getElementById('video-unmute-btn').click()
            else document.getElementById('video-mute-btn').click()
        }
        setIsMuted(!isMuted)
    }

    return (
        <Border $borderSize={borderSize} $iconSize={iconSize} onClick={setMute}>
            {isMuted ? <GoMute /> : <GoUnmute />}
        </Border>
    )
}