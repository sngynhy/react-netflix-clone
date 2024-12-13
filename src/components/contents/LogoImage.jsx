import { useQuery } from "@tanstack/react-query";
import { fetchImage } from "api/movieApi";
import PropTypes from "prop-types";
import React from "react";
import { getContentImg } from "utils/CommonFunction";

export const LogoImage = ({id, mType, alt}) => {
    const {data: logoData} = useQuery({ queryKey: ['image', mType, id], queryFn: fetchImage })
    // const logoPath = logoData?.data.sort((a, b) => b.iso_639_1.localeCompare(a.iso_639_1) && a.height - b.height)[0].file_path
    const compareData = (a, b) => {
        if (a.iso_639_1 > b.iso_639_1) return -1
        if (a.iso_639_1 < b.iso_639_1) return 1
        return a.height - b.height
    }
    // console.log('logoData >>', logoData);
    if (!logoData) return <div>{alt}</div>
    const logoPath = logoData?.data?.sort(compareData)[0]?.file_path

    return (
        <div>
            <img src={getContentImg(logoPath)} alt={alt + '_로고'} width="60%" style={{}}/>
        </div>
    )
} 

LogoImage.prototype = {
    id: PropTypes.number.isRequired,
    mType: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
}