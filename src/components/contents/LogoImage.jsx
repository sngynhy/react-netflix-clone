import { useQuery } from "@tanstack/react-query";
import { fetchImage } from "api/mediaApi";
import PropTypes from "prop-types";
import React, { useMemo } from "react";
import styled from "styled-components";
import { media } from "utils/mediaQuery";
import { getContentImg } from "utils/CommonFunction";

const compareData = (a, b) => {
    if (a.iso_639_1 > b.iso_639_1) return -1;
    if (a.iso_639_1 < b.iso_639_1) return 1;
    return a.height - b.height;
}
                                                        // width='500px', height='200px'
export const LogoImage = React.memo(({ id, mType, alt, width='35vw', height='12vw', lowerTitle=false, fontSize='80%' }) => {
    const {data: logoData, isLoading: logoDataLoading, error: logoDataError} = useQuery({ queryKey: ['image', mType, id], queryFn: fetchImage })
    // const logoPath = logoData?.data.sort((a, b) => b.iso_639_1.localeCompare(a.iso_639_1) && a.height - b.height)[0].file_path

    const logoPath = useMemo(() => {
        if (logoDataLoading) return
        const path = logoData?.data?.sort(compareData)[0]?.file_path
        return path ? getContentImg(path) : null
    }, [logoData, logoDataLoading])

    if (!logoDataLoading && !logoPath) return <div style={{fontSize: fontSize, color: 'white', fontWeight: 'bold'}}>{alt}</div>

    return (
        <Wrapper $width={width} $height={height} $lowerTitle={lowerTitle}>
            {logoPath && <img src={logoPath} alt={alt + '_로고'} style={{width: '100%', height: '100%', position: 'absolute', bottom: '2px' }}/>}
        </Wrapper>
    )
})

const Wrapper = styled.div`
    position: relative;
    width: ${props => props.$width};
    height: ${props => props.$height};
    ${props => props.$lowerTitle && 'transition: 1s;'}
    
    ${media.large`
        ${props => props.$lowerTitle && 'transform: scale(.7) translate(-108px, 190px);'}
    `}
    ${media.medium`
        ${props => props.$lowerTitle && 'transform: scale(.7) translate(-70px, 120px);'}
    `}
    ${media.small`
        ${props => props.$lowerTitle && 'transform: scale(.7) translate(-26px, 68px);'}
    `}
`

LogoImage.prototype = {
    id: PropTypes.number.isRequired,
    mType: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number
}