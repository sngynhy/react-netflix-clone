import PropTypes from "prop-types";
import React from "react";
import { MyContentsButton } from "components/ui/button/MyContentsButton";
import { ImageCard } from "./ImageCard";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useResponsive } from "hooks/useResponsive";
import { logoImage } from "utils/mediaSize";
import { media } from "utils/mediaQuery";

GridContents.prototype = {
    data: PropTypes.object.isRequired,
    mType: PropTypes.string.isRequired,
    gridTemplateColumns: PropTypes.string,
    gap: PropTypes.string,
    showTitle: PropTypes.bool,
    showOverview: PropTypes.bool,
    imgPath: PropTypes.string
}

function GridContents ({ mType, data, gridColumns=6, gap=10, showTitle=false, showOverview=false, showPlayButton=false, hoverEffect=true, imgPath=`backdrop_path`, borderRadius=0 }) {
    const navigate = useNavigate()
    const location = useLocation()
    // console.log('GridContents', location);
    const { device } = useResponsive()

    const openModal = (props) => {
        // console.log('🧮 GridContents > openModal', location);
        if (mType === 'person') {
            navigate(`/search/md/person?id=${encodeURIComponent(props.id)}`, {state: { background: location, condition: 'person', title: props.name }})
        } else {
            navigate(`/detail?id=${encodeURIComponent(props.id)}`, {state: { background: location.state?.background || location, mType: mType || props.media_type }})
        }
    }
    return (
        <Container $gap={gap} $gridColumns={gridColumns}>
            {data.map((el, i) => (
                    <GridContent className='grid-contents' key={i} onClick={() => {if (hoverEffect) openModal(el)}} $hovereffect={hoverEffect}>
                        <ImageCard
                            id={el.id}
                            mType={mType || el.media_type}
                            title={el.title || el.name}
                            showTitle={showTitle}
                            showPlayButton={showPlayButton}
                            imgPath={el[imgPath]}
                            borderRadius={borderRadius}
                            width={logoImage.main[device].width}
                            height={logoImage.main[device].height}
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
        </Container>
    )
}
const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.$gridColumns}, 1fr);
    gap: ${props => props.$gap}px;
    margin-top: 10px;
`
const GridContent = styled.div`
    ${props => props.$hovereffect &&
        `&:hover {
            transform: scale(1.2);
            transition: 0.5s;
            z-index: 99;
        }`
    }
    
`

const buttonSize = {
    lg: {border: 35, icon: 25},
    md: {border: 35, icon: 25},
    sm: {border: 25, icon: 15},
}
const Overview = (props) => {
    const {id, mType, showTitle, showOverview, title, overview } = props
    const { device } = useResponsive()

    return (
        <TitleOverview>
            {showTitle &&
                <div className="title">
                    <div style={{maxWidth: '80%'}}>{title}</div>
                    <MyContentsButton id={id} mType={mType} borderSize={buttonSize[device].border} iconSize={buttonSize[device].icon} />
                </div>
            }
            {showOverview && 
                <div className="overview">
                    {/* {overview.length > 130 ? overview.slice(0, 130) + '...': overview} */}
                    {overview.length > 80 ? overview.slice(0, 80) + '...' : overview}
                </div>
            }
        </TitleOverview>
    )
}
const TitleOverview = styled.div`
    padding: 8px;
    color: #d2d2d2;
    background-color: #2f2f2f;
    border-radius: 0 0 6px 6px;

    & > .title {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        ${media.small`
            min-height: 47px;
        `}
    }
    & > .overview {
        font-size: 14px;
        margin: 8px 0;
        max-height: 130px;
        min-height: 130px;

        ${media.small`
            font-size: 84%;
        `}
    }
`
export default React.memo(GridContents)