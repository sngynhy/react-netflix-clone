import React, { useState } from "react";
import { getContentImg } from "utils/CommonFunction";
import { PlayButton } from "components/ui/PlayButton";
import { LogoImage } from "./LogoImage";

export const BackdropImage = ({id, mType, title, showPlayButton=false, showTitle=false, imgPath, width='120px', height='60px'}) => {
    return (
        <>
            <div className="backdrop-img" style={{position: 'relative', cursor: 'pointer'}}>
                <img loading="lazy" src={getContentImg(imgPath)} alt={title} width='100%' />
                {showPlayButton &&
                    <div style={{position: 'absolute', top: 'calc(50% - 20px)', left: 'calc(50% - 20px)'}}>
                        <PlayButton type="icon" />
                    </div>
                }
                {showTitle && 
                    <div className="logo-img" style={{position: 'absolute', bottom : '10px', left: '10px', fontSize: '22px'}}>
                        <LogoImage id={id} mType={mType} alt={title} width={width} height={height} />
                    </div>
                }
            </div>
        </>
    )
}