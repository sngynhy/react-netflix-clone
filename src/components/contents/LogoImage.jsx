import { useQuery } from "@tanstack/react-query";
import { fetchImage } from "api/movieApi";
import PropTypes from "prop-types";
import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { getContentImg } from "utils/CommonFunction";

const compareData = (a, b) => {
    if (a.iso_639_1 > b.iso_639_1) return -1;
    if (a.iso_639_1 < b.iso_639_1) return 1;
    return a.height - b.height;
}

export const LogoImage = React.memo(({ id, mType, alt, width='500px', height='200px', lowerTitle=false }) => {
    // console.log('LogoImage', id, mType, lowerTitle);
    const {data: logoData, isLoading: logoDataLoading, error: logoDataError} = useQuery({ queryKey: ['image', mType, id], queryFn: fetchImage })
    // const logoPath = logoData?.data.sort((a, b) => b.iso_639_1.localeCompare(a.iso_639_1) && a.height - b.height)[0].file_path
    // console.log('LogoImage > id', id, logoDataLoading, logoDataError, logoData);

    const logoPath = useMemo(() => {
        if (logoDataLoading) return
        const path = logoData?.data?.sort(compareData)[0]?.file_path
        return path ? getContentImg(path) : null
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logoData])

    if (!logoDataLoading && !logoPath) return <div style={{fontSize: '80%'}}>{alt}</div>

    return (
        // <div style={{width: `${width}`, height: `${height}`, position: 'relative'}}>
        <Div $width={width} $height={height} $lowerTitle={lowerTitle}>
            {logoPath && <img src={logoPath} alt={alt + '_로고'} style={{width: '100%', height: '100%', position: 'absolute', bottom: '2px' }}/>}
        </Div>
    )
})

const Div = styled.div`
    width: ${props => props.$width};
    height: ${props => props.$height};
    position: relative;
    ${props => props.$lowerTitle && 'transition:  1s;'}
    ${props => props.$lowerTitle && 'transform:  scale(.7) translate(-72px, 40px);'}
`

LogoImage.prototype = {
    id: PropTypes.number.isRequired,
    mType: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number
}