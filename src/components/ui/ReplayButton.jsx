import React, { useEffect, useState } from "react";
import { MdOutlineReplay } from "react-icons/md";
import { Border } from "styles/IconButtonStyle";

export const ReplayButton = ({borderSize=45, iconSize=25}) => {
    const replay = () => {
        document.getElementById('video-play-btn').click()
    }
    return (
        <Border $borderSize={borderSize} $iconSize={iconSize} onClick={replay}>
            <MdOutlineReplay />
        </Border>
    )
}