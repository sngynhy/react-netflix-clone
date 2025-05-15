import React, { useState } from "react";
import { getContentImg } from "utils/CommonFunction";
import { LogoImage } from "components/contents/LogoImage";
import { VideoPlayer } from "components/contents/VideoPlayer";

export const ImageCard = React.memo(({id, mType, title, showPlayButton=false, showTitle=false, imgPath, width='7rem', height='3rem', borderRadius=0}) => {
    const [show, setShow] = useState(false)

    return (
        <>
            <div className="img-card" style={{position: 'relative', cursor: showPlayButton ? 'default' : 'pointer'}} onMouseEnter={() => {if (showPlayButton) setShow(true)}} onMouseLeave={() => {if (showPlayButton)setShow(false)}}>
                <img loading="lazy" src={getContentImg(imgPath)} alt={title} width='100%' style={{display: 'block', borderRadius: borderRadius}} />
                {showPlayButton && <VideoPlayer id={id} mType={mType} showPlayButton={showPlayButton} show={show} />}
                {showTitle && 
                    <div className="logo-img" style={{position: 'absolute', bottom : '10px', left: '10px', fontSize: '22px'}}>
                        <LogoImage id={id} mType={mType} alt={title} width={width} height={height} />
                    </div>
                }
            </div>
        </>
    )
})