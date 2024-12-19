import PropTypes from "prop-types";
import React from "react";
import { getContentImg } from "utils/CommonFunction";
import MyContentsButton from "components/ui/MyContentsButton";
import { LogoImage } from "./LogoImage";
import { PlayButton } from "components/ui/PlayButton";
import { BackdropImage } from "components/contents/BackdropImage";

GridContents.prototype = {
    data: PropTypes.object.isRequired,
    mType: PropTypes.string.isRequired,
    gridTemplateColumns: PropTypes.string,
    gap: PropTypes.string,
    showTitle: PropTypes.bool,
    showOverview: PropTypes.bool,
    imgPath: PropTypes.string
}

function GridContents ({ mType, data, gridColumns=`repeat(6, 1fr)`, gap=10, showTitle=true, showOverview=false, showPlayButton=false, imgPath=`poster_path` }) {
    return (
        <div style={{display: 'grid', gridTemplateColumns: `repeat(${gridColumns}, 1fr)`, gap: `${gap}px`, marginTop: '10px', }}>
            {data.map(el => (
                    <div key={el.id}>
                        <BackdropImage id={el.id} mType={mType ? mType : !mType && 'seasons' in el ? 'tv' : 'movie'} title={el.title || el.name} showTitle={showTitle} showPlayButton={showPlayButton} imgPath={el[imgPath]} width='120px' height='60px' />
                        {showOverview && <Overview id={el.id} mType={mType} showTitle={showTitle} showOverview={showOverview} title={el.title || el.name} overview={el.overview} />}    
                    </div>
                )
            )}
        </div>
    )
}


const Overview = (props) => {
    const {id, mType, showTitle, showOverview, title, overview } = props

    return (
        <div style={{padding: '8px', color: '#d2d2d2', backgroundColor: '#2f2f2f', borderRadius: '0 0 6px 6px'}}>
            {showTitle &&
                <div style={{width: '100%', display: 'grid', gridTemplateColumns: '88% 12%', alignItems: 'center'}}>
                    <div>{title}</div>
                    <MyContentsButton id={id} mType={mType} />
                </div>
            }
            {showOverview && 
                <div style={{fontSize: '14px', margin: '5px 0', maxHeight: '130px', minHeight: "130px"}}>
                    {overview.length > 130 ? overview.slice(0, 130) + '...': overview}
                </div>
            }
        </div>
    )
}

export default GridContents