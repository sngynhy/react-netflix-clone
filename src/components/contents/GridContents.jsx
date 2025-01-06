import PropTypes from "prop-types";
import React from "react";
import MyContentsButton from "components/ui/button/MyContentsButton";
import { BackdropImage } from "components/contents/BackdropImage";
import { useMediaStore } from "stores/mediaStore";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

GridContents.prototype = {
    data: PropTypes.object.isRequired,
    mType: PropTypes.string.isRequired,
    gridTemplateColumns: PropTypes.string,
    gap: PropTypes.string,
    showTitle: PropTypes.bool,
    showOverview: PropTypes.bool,
    imgPath: PropTypes.string
}

function GridContents ({ mType, data, gridColumns=`repeat(6, 1fr)`, gap=10, showTitle=true, showOverview=true, showPlayButton=false, eventEffect=true, imgPath=`poster_path` }) {
    // console.log('GridContents > mType', mType, data);
    const {setMediaType, setOpenContentId, setOpenDetailModal, setOpenSearchModal} = useMediaStore()

    const navigate = useNavigate()
    const location = useLocation()

    const openModal = (id, mType) => {
        if (mType !== 'person') {
            setOpenContentId(id)
            setMediaType(mType)
            setOpenDetailModal(true)
        } else {
            // navigate(`/search/person?personId=${encodeURIComponent(id)}`, {state: { background: location }})
            navigate(`/search/person?personId=${encodeURIComponent(id)}`, {state: { background: location }})
            // setOpenSearchModal(true)
        }
    }
    return (
        <div style={{display: 'grid', gridTemplateColumns: `repeat(${gridColumns}, 1fr)`, gap: `${gap}px`, marginTop: '10px', }}>
            {data.map(el => (
                    <GridContent className='grid-contents' key={el.id} onClick={() => {if (eventEffect) openModal(el.id, mType || el.media_type)}} $hovereffect={eventEffect}>
                        <BackdropImage
                            id={el.id}
                            mType={mType || el.media_type}
                            title={el.title || el.name}
                            showTitle={showTitle}
                            showPlayButton={showPlayButton}
                            imgPath={el[imgPath]}
                            width='120px'
                            height='60px'
                        />
                        {showOverview &&
                            <Overview
                                id={el.id}
                                mType={mType}
                                showTitle={showTitle}
                                showOverview={showOverview}
                                title={el.title || el.name}
                                overview={el.overview}
                            />}    
                    </GridContent>
                )
            )}
        </div>
    )
}
const GridContent = styled.div`
    ${props => props.$hovereffect &&
        `&:hover {
            transform: scale(1.2);
            transition: 0.5s;
            z-index: 99;
        }`
    }
    
`

const Overview = (props) => {
    const {id, mType, showTitle, showOverview, title, overview } = props

    return (
        <div style={{padding: '8px', color: '#d2d2d2', backgroundColor: '#2f2f2f', borderRadius: '0 0 6px 6px'}}>
            {showTitle &&
                <div style={{width: '100%', display: 'grid', gridTemplateColumns: '85% 15%', alignItems: 'center'}}>
                    <div>{title}</div>
                    <MyContentsButton id={id} mType={mType} borderSize={35} iconSize={25} />
                </div>
            }
            {showOverview && 
                <div style={{fontSize: '14px', margin: '8px 0', maxHeight: '130px', minHeight: "130px"}}>
                    {overview.length > 130 ? overview.slice(0, 130) + '...': overview}
                </div>
            }
        </div>
    )
}

export default GridContents