import React from "react";
import { GoUnmute, GoMute } from "react-icons/go";
import { useMediaStore } from "stores/mediaStore";
import { Border } from "styles/IconButtonStyle";

export const MuteButton = ({borderSize=45, iconSize=25}) => {
    const {isMuted, setIsMuted} = useMediaStore()
    const setMute = (props) => {
        setIsMuted(props)
        if (props) document.getElementById('video-mute-btn').click()
        else document.getElementById('video-unmute-btn').click()
    }

    return (
        <Border $borderSize={borderSize} $iconSize={iconSize}>
            {isMuted ? <GoMute onClick={() => setMute(false)} /> : <GoUnmute onClick={() => setMute(true)} />}
        </Border>
    )
}