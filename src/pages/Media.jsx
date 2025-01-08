import React, { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom';
import { MainContent } from 'components/contents/media/MainContent';
import { GenreContents } from 'components/contents/media/slidersection/GenreContents';
import { MediaContents } from 'components/contents/media/slidersection/MediaContents';
import { getContentImg } from 'utils/CommonFunction';

function Media () {
    const { mType, genreId } = useParams()
    const [coverData, setCoverData] = useState(null)
    const recieveCoverData = useCallback((data) => {
        // console.log('recieveCoverData', data)
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
            {/** 중앙 메인 콘텐츠 */}
            {coverData && <MainContent mType={mType} genreId={genreId} coverData={coverData} recieveCoverData={recieveCoverData} />}

            {/** 하단 슬라이더 */}
            {genreId ? <GenreContents mType={mType} genreId={genreId} sendCoverDat={recieveCoverData} /> : <MediaContents mType={mType} sendCoverData={recieveCoverData} />}
        </div>
    )
}

export default Media