import { useQuery } from "@tanstack/react-query";
import { fetchImage } from "api/movieApi";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { getContentImg, getLogoImg } from "utils/CommonFunction";
import { useGlobalStore, useMediaStore } from "stores/CommonStore";

export const LogoImage = ({ id, mType, alt, width='500px', height='200px' }) => {
    // const {mediaType, contentId} = useMediaStore()
    // const {setIsLoading} = useGlobalStore()
    const {data: logoData, isLoading: logoDataLoading, error: logoDataError} = useQuery({ queryKey: ['image', mType, id], queryFn: fetchImage })
    // const logoPath = logoData?.data.sort((a, b) => b.iso_639_1.localeCompare(a.iso_639_1) && a.height - b.height)[0].file_path
    // console.log('LogoImage > id', id, logoDataLoading, logoDataError, logoData);

    if (logoDataLoading || logoDataError || !logoData || logoData?.data.length === 0) return <div>{alt}</div>

    return (
        <div style={{width: `${width}`, height: `${height}`, position: 'relative'}}>
            <img src={getLogoImg(logoData)} alt={alt + '_로고'} style={{width: '100%', height: '100%', position: 'absolute', bottom: '2px'}}/>
        </div>
    )
} 

LogoImage.prototype = {
    id: PropTypes.number.isRequired,
    mType: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number
}