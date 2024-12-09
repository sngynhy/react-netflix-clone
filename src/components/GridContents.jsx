import PropTypes from "prop-types";
import React from "react";
import { getContentImg } from "utils/CommonFunction";

function GridContents (props) {
    const { gridColumns, gap, data, showTitle, showOverview, imgPath  } = props // data = { title, imgPath, overview, ... }

    return (
        <div style={{display: 'grid', gridTemplateColumns: `repeat(${gridColumns}, 1fr)`, gap: `${gap}px`}}>
            {data.map(el => {
                return (
                <div key={el.id} style={{marginBottom: '2px'}}>
                    {/* <img loading="lazy" src={getContentImg(el.backdrop_path)} alt="포스터" width='100%'/> */}
                    <img loading="lazy" src={getContentImg(el[imgPath])} alt="포스터" width='100%'/>
                    {showTitle && <div>{el.title || el.name}</div>}
                    {showOverview && <div>{el.overview}</div>}
                </div>
                )
            })}
        </div>
    )
}

GridContents.prototype = {
    gridTemplateColumns: PropTypes.string,
    gap: PropTypes.string,
    showTitle: PropTypes.bool,
    showOverview: PropTypes.bool,
    data: PropTypes.object.isRequired,
    imgPath: PropTypes.string
}
GridContents.defaultProps = {
    gridTemplateColumns: `repeat(6, 1fr)`,
    gap: 10,
    showTitle: false,
    showOverview: false,
    imgPath: 'poster_path' // 'poster_path' or 'backdrop_path' or 'profile_path'
}
export default GridContents