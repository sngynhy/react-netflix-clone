import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { getContentImg } from "utils/CommonFunction";
import MyContentsButton from "components/ui/MyContentsButton";
import styled from "styled-components";
import { fetchImage } from "api/movieApi";
import { useQuery } from "@tanstack/react-query";
import { LogoImage } from "./LogoImage";

GridContents.prototype = {
    data: PropTypes.object.isRequired,
    mType: PropTypes.string.isRequired,
    gridTemplateColumns: PropTypes.string,
    gap: PropTypes.string,
    showTitle: PropTypes.bool,
    showOverview: PropTypes.bool,
    imgPath: PropTypes.string
}

function GridContents ({ mType, data, gridColumns=`repeat(6, 1fr)`, gap=10, showTitle=true, showOverview=false, imgPath=`poster_path` }) {
    return (
        <div style={{display: 'grid', gridTemplateColumns: `repeat(${gridColumns}, 1fr)`, gap: `${gap}px`, marginTop: '10px', }}>
            {data.map(el => {
                return (
                    <div key={el.id}>
                        <div className="backdrop-img" style={{position: 'relative'}}>
                            <img loading="lazy" src={getContentImg(el[imgPath])} alt={el.title} width='100%' style={{cursor: 'pointer'}} />
                            {showTitle && 
                                <div className="logo-img" style={{position: 'absolute', bottom : '10px', left: '10px'}}>
                                    <LogoImage id={el.id} mType={mType ? mType : !mType && 'seasons' in el ? 'tv' : 'movie'} alt={el.title} />
                                </div>
                            }
                        </div>
                        {/* <div style={{cursor: 'pointer', border:'1px solid', backgroundImage: `url(${getContentImg(el[imgPath])})`, backgroundSize: 'contain', height: '200px'}}></div> */}
                        {showOverview && <Overview id={el.id} mType={mType} showTitle={showTitle} showOverview={showOverview} title={el.title || el.name} overview={el.overview} />}    
                    </div>
                )
            })}
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