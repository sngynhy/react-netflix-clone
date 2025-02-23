import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { MainContent } from 'components/contents/media/MainContent';
import { GenreContents } from 'components/contents/media/slidersection/GenreContents';
import { MediaContents } from 'components/contents/media/slidersection/MediaContents';
import { getContentImg } from 'utils/CommonFunction';
import { useMediaStore } from 'stores/mediaStore';

function Media () {
    const { mType, genreId } = useParams()
    const [coverData, setCoverData] = useState(null)
    const { mediaTypes, genreName } = useMediaStore()
    const genre = genreId && genreName ? genreName + ' ' : ''

    const recieveCoverData = useCallback((data) => {
        const coverData = {
            id: data.id,
            title: data.title || data.name,
            img: getContentImg(data.backdrop_path),
            overview: data.overview.length > 130 ? data.overview.slice(0, 130) + '...' : data.overview
        }
        setCoverData(coverData)
    }, [])

    // console.log('✨Media✨', coverData);
    return (
        <div style={{height: '100%', width: '100%'}}>
            <Helmet>
                <title>{genre + mediaTypes[mType] + ' - 넷플릭스'}</title>
            </Helmet>
            {/** 중앙 메인 콘텐츠 */}
            {coverData && <MainContent mType={mType} genreId={genreId} coverData={coverData} />}

            {/** 하단 슬라이더 */}
            {genreId
                ? <GenreContents mType={mType} genreId={genreId} sendCoverDat={recieveCoverData} />
                : <MediaContents mType={mType} sendCoverData={recieveCoverData} />
            }
        </div>
    )
}

export default Media