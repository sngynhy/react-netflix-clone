import React, { useState } from "react";
import { getContentImg } from "utils/CommonFunction";
import { PlayButton } from "components/ui/button/PlayButton";
import { LogoImage } from "./LogoImage";

export const BackdropImage = ({id, mType, title, showPlayButton=false, showTitle=false, imgPath, width='120px', height='60px'}) => {
    const [show, setShow] = useState(false)
    return (
        <>
            <div className="backdrop-img" style={{position: 'relative', cursor: 'pointer'}} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
                <img loading="lazy" src={getContentImg(imgPath)} alt={title} width='100%'/>
                {showPlayButton && show &&
                    <div style={{position: 'absolute', top: 'calc(50% - 30px)', left: 'calc(50% - 30px)', zIndex: 999}}>
                        <PlayButton active={false} type="icon" iconSize={45} />
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