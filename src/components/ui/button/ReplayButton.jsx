import React from "react";
import { MdOutlineReplay } from "react-icons/md";
import { useMediaStore } from "stores/mediaStore";
import { Border } from "styles/IconButtonStyle";

export const ReplayButton = ({borderSize=45, iconSize=25}) => {
    const {playerState} = useMediaStore()
    const replay = () => {
        document.getElementById('video-play-btn-' + playerState.id).click()
    }
    return (
        <Border $borderSize={borderSize} $iconSize={iconSize} onClick={replay}>
            <MdOutlineReplay />
        </Border>
    )
}