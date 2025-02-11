import { useQuery } from "@tanstack/react-query";
import { fetchImage } from "api/mediaApi";
import PropTypes from "prop-types";
import React, { useMemo } from "react";
import styled from "styled-components";
import { getContentImg } from "utils/CommonFunction";

const compareData = (a, b) => {
    if (a.iso_639_1 > b.iso_639_1) return -1;
    if (a.iso_639_1 < b.iso_639_1) return 1;
    return a.height - b.height;
}
                                                        // width='500px', height='200px'
export const LogoImage = React.memo(({ id, mType, alt, width='35vw', height='12vw', lowerTitle=false, transform=null, fontSize='80%' }) => {
    // console.log('LogoImage', id, mType, lowerTitle);
    const {data: logoData, isLoading: logoDataLoading, error: logoDataError} = useQuery({ queryKey: ['image', mType, id], queryFn: fetchImage })
    // const logoPath = logoData?.data.sort((a, b) => b.iso_639_1.localeCompare(a.iso_639_1) && a.height - b.height)[0].file_path
    // console.log('LogoImage > id', id, logoDataLoading, logoDataError, logoData);

    const logoPath = useMemo(() => {
        if (logoDataLoading) return
        const path = logoData?.data?.sort(compareData)[0]?.file_path
        return path ? getContentImg(path) : null
    }, [logoData, logoDataLoading])

    if (!logoDataLoading && !logoPath) return <div style={{fontSize: fontSize, color: 'white', fontWeight: 'bold'}}>{alt}</div>

    return (
        <Wrapper $width={width} $height={height} $lowerTitle={lowerTitle} $transform={transform}>
            {logoPath && <img src={logoPath} alt={alt + '_로고'} style={{width: '100%', height: '100%', position: 'absolute', bottom: '2px' }}/>}
        </Wrapper>
    )
})

const Wrapper = styled.div`
    position: relative;
    width: ${props => props.$width};
    height: ${props => props.$height};
    transition:  1s;
    transform: ${props => props.$lowerTitle && props.$transform ? props.$transform : 'scale(1) translate: (0)'};
`

LogoImage.prototype = {
    id: PropTypes.number.isRequired,
    mType: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number
}